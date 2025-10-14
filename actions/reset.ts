"use server";

import { z } from "zod";

import { resetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";

export const reset = async (values: z.infer<typeof resetSchema>) => {
    const validatedFields = resetSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.message };
    }

    const { email } = validatedFields.data;

    const user = await getUserByEmail(email);

    if (!user) {
        return { error: "Email does not exist!" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Reset email sent!" };    
}