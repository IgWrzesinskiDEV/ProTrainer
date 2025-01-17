import * as React from "react";

interface EmailTemplateProps {
  link: string;
}

export const EmailVerifyTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  link,
}) => (
  <div>
    <h1>Verify your email addres</h1>

    <p>
      Click{" "}
      <a
        href={link}
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        here
      </a>{" "}
      to confirm email.
    </p>
  </div>
);

export const PasswordResetTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  link,
}) => (
  <div>
    <h1>Reset your password</h1>

    <p>
      Click{" "}
      <a
        href={link}
        style={{
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        here
      </a>{" "}
      to reset your password.
    </p>
  </div>
);
