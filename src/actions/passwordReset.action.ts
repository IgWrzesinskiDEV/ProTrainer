"use server";

import { PasswordReset } from "@/lib/models/passwordReset.model";
import { getPasswordResetTokenByToken } from "@/utils/data/passwordResetToken";
import { getUserByEmail } from "@/utils/data/user";
import { User } from "@/lib/models/user.model";
import { createAuthSession } from "@/lib/lucia/auth";
import { createPasswordResetToken } from "@/utils/tokens";
import { hashUserPassword } from "@/utils/hash";

import { sendPasswordResetEmail } from "@/utils/mails";
export async function sendPasswordReset(
  prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;
  if (!email || !email.includes("@")) {
    return { error: "Invalid email" };
  }
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "User not found" };
  }

  const existingToken = await createPasswordResetToken(email);

  sendPasswordResetEmail(existingToken.email, existingToken.token);

  return { success: "Password reset email sent" };
}

export async function newPassword(
  prevState: unknown,
  formData: FormData,
  token: string
) {
  if (!token) {
    return { error: "Token is required" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token not exist" };
  }

  const isExpire = new Date() > existingToken.expiresAt;

  if (isExpire) {
    return { error: "Token is expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User not found" };
  }

  const password = formData.get("password") as string;
  const hashedPassword = hashUserPassword(password);

  await User.updateOne(
    { email: existingToken.email },
    { password: hashedPassword }
  );

  await PasswordReset.findByIdAndDelete(existingToken._id);
  await createAuthSession(existingUser._id.toString());

  return { success: "Password has been changed" };
}
