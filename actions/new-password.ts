import { z } from "zod";

import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

import { newPasswordSchema } from "@/schemas";

export const newPassword = async (values: z.infer<typeof newPasswordSchema>, token: string | null) => {
    if (!token) {
        return { error: "Missing token!" };
    }

    const validatedFields = newPasswordSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.message };
    }

    const { password } = validatedFields.data;

    const passwordResetToken = await getPasswordResetTokenByToken(token);

    if (!passwordResetToken) {
        return { error: "Invalid token!" };
    }

    const hasExpired = passwordResetToken.expires < new Date();
    
    if (hasExpired) {
        return { error: "Token has expired!" };
    }

    const user = await getUserByEmail(passwordResetToken.email);

    if (!user) {
        return { error: "Email does not exist!" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });
    
    await db.passwordResetToken.delete({
        where: { id: passwordResetToken.id },
    });

    return { success: "Password updated successfully!" };
}