import { Resend } from "resend";

import EmailTemplate from "@/components/UI/auth/email/PasswordAndEmailVerifyTemplate.tsx";
const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(
  email: string,
  token: string,
  userName: string
) {
  const confirmLink = `${domain}/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: "noreply@protrainer.pro",
    to: email,
    subject: "Confirm your ProTrainer account",
    react: EmailTemplate({
      userName: userName,
      actionLink: confirmLink,
      isEmailVerify: true,
    }),
  });
}

export async function sendPasswordResetEmail(
  email: string,
  token: string,
  userName: string
) {
  const confirmLink = `${domain}/auth/set-new-password?token=${token}`;

  await resend.emails.send({
    from: "noreply@protrainer.pro",
    to: email,
    subject: "Reset your ProTrainer password",
    react: EmailTemplate({
      userName: userName,
      actionLink: confirmLink,
      isEmailVerify: false,
    }),
  });
}
