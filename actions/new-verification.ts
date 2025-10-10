"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const newVerification = async (token: string) => {
    const verificationToken = await getVerificationTokenByToken(token);

    if (!verificationToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = verificationToken.expires < new Date();

    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const user = await getUserByEmail(verificationToken.email);

    if (!user) {
        return { error: "Email does not exist!" };
    }

    await db.user.update({
        where: { id: user.id },
        data: { 
            emailVerified: new Date(),
            email: verificationToken.email // prevent email change
        },
    });

    await db.verificationToken.delete({
        where: { id: verificationToken.id },
    });

    return { success: "Email verified successfully!" };
}