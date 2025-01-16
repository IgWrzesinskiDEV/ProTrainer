import { EmailVerification } from "@/lib/models/email_verification.model";

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
    console.log(token, "token in getVerificationTokenByToken");
    const verificationToken = await EmailVerification.findOne({
      token,
    });
    console.log(
      verificationToken,
      "verificationToken in getVerificationTokenByToken"
    );
    return verificationToken;
  } catch (err) {
    console.log(err, "err");
    return null;
  }
};
