import { Resend } from "resend";
import { EmailTemplate } from "@/components/UI/auth/email/EmailTemplate";
const resend = new Resend(process.env.RESEND_API_KEY);

//const domain= process.env.NEXT_PUBLIC_BASE_URL;

export async function sendVerificationEmail(email: string, token: string) {
  // const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const confirmLink = `http://localhost:3000/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Verify your email address",
    react: await EmailTemplate({ link: confirmLink }),
  });
}
