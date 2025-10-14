import { VerificationTemplate } from "@/components/email/verification-template";
import { ResetTemplate } from "@/components/email/reset-template";
import { Resend } from "resend";
import { getUserByEmail } from "@/data/user";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
    
    const user = await getUserByEmail(email);
    const displayName = user?.name || email.split('@')[0];
    
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Verify your email",
        react: VerificationTemplate({ firstName: displayName, verificationLink: confirmLink }),
    });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    
    const user = await getUserByEmail(email);
    const displayName = user?.name || email.split('@')[0];
    
    
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Reset your password",
        react: ResetTemplate({ firstName: displayName, resetLink }),
    });
}