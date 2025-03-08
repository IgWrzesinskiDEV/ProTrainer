import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface EmailTemplateProps {
  userName?: string;
  actionLink?: string;
  isEmailVerify?: boolean;
}

const domain = process.env.NEXT_PUBLIC_BASE_URL;

export const EmailTemplate = ({
  userName = "User",
  actionLink,
  isEmailVerify = true,
}: EmailTemplateProps) => (
  <Html>
    <Head />
    <Preview>
      {isEmailVerify
        ? "Verify your email address to get started"
        : "Reset your password"}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img
            src={`${domain}/logo/logo.png`}
            width="80"
            height="80"
            alt="Logo"
            style={logo}
          />
        </Section>

        <Section style={headerSection}>
          <Heading style={h1}>
            {isEmailVerify
              ? "Verify your email address"
              : "Reset your password"}
          </Heading>
          <Text style={welcomeText}>
            {isEmailVerify
              ? `Hi ${userName}, thanks for signing up! Please verify your email address to get started.`
              : `Hi ${userName}, we received a request to reset your password. Click the button below to create a new password.`}
          </Text>
        </Section>

        <Section style={verificationSection}>
          <Text style={instructionText}>
            {isEmailVerify
              ? "Click the button below to verify your email address:"
              : "Click the button below to reset your password:"}
          </Text>
          <Button style={buttonStyle} href={actionLink}>
            {isEmailVerify ? "Verify Email Address" : "Reset Password"}
          </Button>
        </Section>

        <Hr style={divider} />

        <Section style={helpSection}>
          <Text style={helpText}>
            {isEmailVerify
              ? "If you didn't create an account, you can safely ignore this email."
              : "If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged."}
          </Text>
        </Section>

        <Hr style={divider} />

        <Section>
          <Row style={footerRow}>
            <Column>
              <Img
                src={`${domain}/logo/logo.png`}
                width="40"
                height="40"
                alt="Logo"
                style={logo}
              />
            </Column>
          </Row>
        </Section>

        <Text style={footerText}>
          © {new Date().getFullYear()} ProTrainer. All rights reserved.
          <br />
        </Text>
      </Container>
    </Body>
  </Html>
);

export default EmailTemplate;

// Styles
const main = {
  backgroundColor: "#f5f5f5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "20px",
};

const logo = {
  margin: "0 auto",
};

const headerSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const h1 = {
  color: "#333",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0",
  marginBottom: "16px",
  lineHeight: "1.3",
};

const welcomeText = {
  fontSize: "16px",
  fontWeight: "600",
  lineHeight: "24px",
  color: "#555",
  margin: "0",
};

const verificationSection = {
  marginBottom: "30px",
  padding: "20px",
  marginLeft: "20px",
};

const instructionText = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#555",
  marginBottom: "20px",
  margin: "0 auto",
  textAlign: "center" as const,
};

const buttonStyle = {
  backgroundColor: "#3b82f6",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px 24px",
  margin: "0 auto",
  width: "240px",
  cursor: "pointer",
};

const divider = {
  borderColor: "#e5e7eb",
  margin: "30px 0",
};

const helpSection = {
  marginBottom: "30px",
  margin: "0 auto",
  textAlign: "center" as const,
};

const helpText = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#777",
  margin: "0",
};

const footerRow = {
  alignItems: "center",
  marginBottom: "20px",
};

const footerText = {
  fontSize: "12px",
  lineHeight: "18px",
  color: "#9ca3af",
  textAlign: "center" as const,
  margin: "0",
  marginBottom: "10px",
};
