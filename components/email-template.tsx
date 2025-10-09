import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface EmailTemplateProps {
  firstName: string;
  verificationLink: string;
}

export function EmailTemplate({ firstName, verificationLink }: EmailTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your email - Auth Lab</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>🔐 Auth Lab</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Welcome, {firstName}!</Heading>
            
            <Text style={text}>
              Thank you for signing up with Auth Lab. To complete your registration, 
              please verify your email address.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={verificationLink}>
                Verify Email
              </Button>
            </Section>

            <Text style={text}>
              If the button above doesn't work, you can copy and paste the following link into your browser:
            </Text>
            
            <Text style={linkText}>
              <Link href={verificationLink} style={link}>
                {verificationLink}
              </Link>
            </Text>

            <Text style={text}>
              This link will expire in 24 hours. If you didn't request this account creation, 
              please ignore this email.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © 2024 Auth Lab. All rights reserved.
            </Text>
            <Text style={footerText}>
              This is an automated email, please do not reply.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  padding: '32px 24px 0',
  textAlign: 'center' as const,
};

const logo = {
  color: '#1f2937',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0',
};

const content = {
  padding: '0 24px',
};

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  border: 'none',
};

const linkText = {
  wordBreak: 'break-all' as const,
  margin: '16px 0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

const footer = {
  borderTop: '1px solid #e5e7eb',
  padding: '24px',
  marginTop: '32px',
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
  textAlign: 'center' as const,
};