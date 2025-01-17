import { PasswordReset } from "@/lib/models/passwordReset.model";

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const verificationToken = await PasswordReset.findOne({ email });
    return verificationToken;
  } catch {
    return null;
  }
}
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const verificationToken = await PasswordReset.findOne({
      token,
    });
    return verificationToken;
  } catch {
    return null;
  }
};
