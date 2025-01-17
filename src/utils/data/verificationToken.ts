import { EmailVerification } from "@/lib/models/emailVerification.model";

export async function getEmailVerificationTokenByEmail(email: string) {
  try {
    const verificationToken = await EmailVerification.findOne({ email });
    return verificationToken;
  } catch {
    return null;
  }
}
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await EmailVerification.findOne({
      token,
    });

    return verificationToken;
  } catch {
    return null;
  }
};
