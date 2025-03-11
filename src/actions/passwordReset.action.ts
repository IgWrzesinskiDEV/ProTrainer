"use server";

import { PasswordReset } from "@/lib/models/passwordReset.model";
import { getPasswordResetTokenByToken } from "@/utils/data/passwordResetToken";
import { getUserByEmail } from "@/utils/data/user";
import { User } from "@/lib/models/user.model";
import { createAuthSession, verifyAuth } from "@/lib/lucia/auth";
import { createPasswordResetToken } from "@/utils/tokens";
import { hashUserPassword, verifyPassword } from "@/utils/hash";
import {
  ResetPasswordSchema,
  NewPasswordSchema,
  ChangePasswordSchema,
} from "@/schemas/zSchemas";
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

  sendPasswordResetEmail(
    existingToken.email,
    existingToken.token,
    existingUser.userName
  );

  return { success: "Password reset email sent" };
}

export async function CreateNewPassword(
  prevState: unknown,
  formData: FormData,
  token: string
) {
  const validateData = NewPasswordSchema.safeParse({
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { password } = validateData.data;

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

  const hashedPassword = hashUserPassword(password);

  await User.updateOne(
    { email: existingToken.email },
    { password: hashedPassword }
  );

  await PasswordReset.findByIdAndDelete(existingToken._id);
  await createAuthSession(existingUser._id.toString());

  return { success: "Password has been changed" };
}

export async function changePassword(prevState: unknown, formData: FormData) {
  const validateData = ChangePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword") as string,
    password: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  });
  if (!validateData.success) {
    const errors = validateData.error.errors.map((error) => error.message);
    return { errors: errors };
  }

  const { currentPassword, password } = validateData.data;

  const user = (await verifyAuth()).user;

  if (!user) {
    return { errors: ["User not found"] };
  }

  const existingUser = await getUserByEmail(user.email);

  const isCurrentPasswordValid = verifyPassword(
    existingUser.password,
    currentPassword
  );

  if (!isCurrentPasswordValid) {
    return { errors: ["Current password is incorrect"] };
  }

  const hashedPassword = hashUserPassword(password);

  await User.updateOne({ email: user.email }, { password: hashedPassword });

  return { success: "Password has been changed" };
}
