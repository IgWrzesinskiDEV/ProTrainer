"use server";

import { EmailVerification } from "@/lib/models/emailVerification.model";
import { getVerificationTokenByToken } from "@/utils/data/verificationToken";
import { getUserByEmail } from "@/utils/data/user";
import { User } from "@/lib/models/user.model";
import { createAuthSession } from "@/lib/lucia/auth";
import { sendVerificationEmail } from "@/utils/mails";
import { createEmailVerificationToken } from "@/utils/tokens";
export async function verifyToken(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

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
  await User.updateOne({ email: existingToken.email }, { emailVerified: true });

  await EmailVerification.findByIdAndDelete(existingToken._id);
  await createAuthSession(existingUser._id.toString());

  return { success: "Email verified" };
}

export async function resendVerificationEmail(id: string) {
  const existingUser = await User.findById(id);
  if (!existingUser) {
    return { error: "User not found" };
  }
  const verificationToken = await createEmailVerificationToken(
    existingUser.email
  );
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
    existingUser.userName
  );
  return { success: "Email sent" };
}
