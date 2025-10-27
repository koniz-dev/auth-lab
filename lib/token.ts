import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";

export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 1000 * 60 * 5);

    const existingTwoFactorToken = await getTwoFactorTokenByEmail(email);

    if (existingTwoFactorToken) {
        await db.twoFactorToken.delete({
            where: { id: existingTwoFactorToken.id },
        });
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: { email, token, expires },
    });

    return twoFactorToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const existingVerificationToken = await getVerificationTokenByEmail(email);

    if (existingVerificationToken) {
        await db.verificationToken.delete({
            where: { id: existingVerificationToken.id },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: { email, token, expires },
    });

    return verificationToken;
}

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const existingPasswordResetToken = await getPasswordResetTokenByEmail(email);

    if (existingPasswordResetToken) {
        await db.passwordResetToken.delete({
            where: { id: existingPasswordResetToken.id },
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: { email, token, expires },
    });

    return passwordResetToken;
}