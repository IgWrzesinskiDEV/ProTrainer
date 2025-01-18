import { Resend } from "resend";
import {
  PasswordResetTemplate,
  EmailVerifyTemplate,
} from "@/components/UI/auth/email/EmailTemplates";
const resend = new Resend(process.env.RESEND_API_KEY);

//const domain= process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(email: string, token: string) {
  // const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const confirmLink = `http://localhost:3000/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email address",
    react: await EmailVerifyTemplate({ link: confirmLink }),
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  // const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const confirmLink = `http://localhost:3000/auth/set-new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    react: await PasswordResetTemplate({ link: confirmLink }),
  });
}
