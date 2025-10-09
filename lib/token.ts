import { v4 as uuidv4 } from "uuid";

import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";

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