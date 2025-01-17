import { generateIdFromEntropySize } from "lucia";
import { EmailVerification } from "@/lib/models/emailVerification.model";
import { getEmailVerificationTokenByEmail } from "./data/verificationToken";
export async function createEmailVerificationToken(email: string) {
  const tokenId = generateIdFromEntropySize(24);
  const expiresAt = new Date(new Date().getTime() + 3600 * 2000);

  const existingToken = await getEmailVerificationTokenByEmail(email);
  if (existingToken) {
    await EmailVerification.findByIdAndDelete(existingToken._id);
  }
  const verificationToken = await EmailVerification.create({
    email,
    token: tokenId,
    expires_at: expiresAt,
  });
  return verificationToken;
}
