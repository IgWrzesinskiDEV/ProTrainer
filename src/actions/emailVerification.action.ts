"use server";

import { EmailVerification } from "@/lib/models/email_verification.model";
import { getVerificationTokenByToken } from "@/utils/data/verificationToken";
import { getUserByEmail } from "@/utils/data/user";
import { User } from "@/lib/models/user.model";
import { createAuthSession } from "@/lib/lucia/auth";
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
