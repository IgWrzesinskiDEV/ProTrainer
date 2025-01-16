import * as React from "react";

interface EmailTemplateProps {
  link: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
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
