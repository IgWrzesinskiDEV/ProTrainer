"use server";

import { PasswordReset } from "@/lib/models/passwordReset.model";
import { getPasswordResetTokenByToken } from "@/utils/data/passwordResetToken";
import { getUserByEmail } from "@/utils/data/user";
import { User } from "@/lib/models/user.model";
import { createAuthSession } from "@/lib/lucia/auth";
import { createPasswordResetToken } from "@/utils/tokens";
import { hashUserPassword, verifyPassword } from "@/utils/hash";
import { ResetPasswordSchema, NewPasswordSchema } from "@/schemas/zSchemas";
import { sendPasswordResetEmail } from "@/utils/mails";
export async function sendPasswordReset(
  prevState: unknown,
  formData: FormData
) {
  const validateData = ResetPasswordSchema.safeParse({
    email: formData.get("email") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { email } = validateData.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { errors: ["Email not found"] };
  }

  const existingToken = await createPasswordResetToken(email);

  sendPasswordResetEmail(existingToken.email, existingToken.token);

  return { success: "Password reset email sent" };
}

export async function CreateNewPassword(
  prevState: unknown,
  formData: FormData,
  token: string
) {
  const validateData = NewPasswordSchema.safeParse({
    oldPassword: formData.get("oldPassword") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { oldPassword, password } = validateData.data;

  if (!token) {
    return { errors: ["Token is required"] };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { errors: ["Token not exist"] };
  }

  const isExpire = new Date() > existingToken.expiresAt;

  if (isExpire) {
    return { errors: ["Token is expired"] };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { errors: ["User not found"] };
  }

  const isOldPasswordValid = verifyPassword(existingUser.password, oldPassword);

  if (!isOldPasswordValid) {
    return { errors: ["Old password is incorrect"] };
  }

  const hashedPassword = hashUserPassword(password);

  await User.updateOne(
    { email: existingToken.email },
    { password: hashedPassword }
  );

  await PasswordReset.findByIdAndDelete(existingToken._id);
  await createAuthSession(existingUser._id.toString());

  return { success: "Password has been changed" };
}
