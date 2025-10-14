import * as React from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ResetTemplateProps {
  firstName: string;
  resetLink: string;
}

export function ResetTemplate({ firstName, resetLink }: ResetTemplateProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your password - Auth Lab</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>🔐 Auth Lab</Heading>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Heading style={h1}>Password Reset Request</Heading>
            
            <Text style={text}>
              Hello {firstName},
            </Text>
            
            <Text style={text}>
              We received a request to reset your password for your Auth Lab account. 
              If you made this request, click the button below to reset your password.
            </Text>

            <Section style={buttonContainer}>
              <Button style={button} href={resetLink}>
                Reset Password
              </Button>
            </Section>

            <Text style={text}>
              If the button above doesn't work, you can copy and paste the following link into your browser:
            </Text>
            
            <Text style={linkText}>
              <Link href={resetLink} style={link}>
                {resetLink}
              </Link>
            </Text>

            <Text style={text}>
              This link will expire in 1 hour for security reasons. If you didn't request this password reset, 
              please ignore this email and your password will remain unchanged.
            </Text>
            
            <Text style={text}>
              For security reasons, if you continue to receive these emails without requesting them, 
              please contact our support team.
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