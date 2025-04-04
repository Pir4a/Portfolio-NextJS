import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
} from "@react-email/components"
import * as React from "react"

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  message,
}) => {
  return (
    <Html>
      <Preview>New contact form message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={heading}>New Contact Form Message</Text>
          <Text style={paragraph}>From: {name}</Text>
          <Text style={paragraph}>Email: {email}</Text>
          <Text style={paragraph}>Message:</Text>
          <Text style={messages}>{message}</Text>
          <Link href={`mailto:${email}`} style={button}>
            Reply to {name}
          </Link>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "580px",
}

const heading = {
  fontSize: "24px",
  fontWeight: "600",
  color: "#000",
  margin: "40px 0",
}

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
  margin: "16px 0",
}

const messages = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#333",
  margin: "16px 0",
  padding: "16px",
  backgroundColor: "#f4f4f4",
  borderRadius: "4px",
}

const button = {
  backgroundColor: "#ec4899",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
  padding: "12px",
  marginTop: "24px",
}
