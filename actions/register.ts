"use server";

import { z } from "zod";

import { registerSchema } from "@/schemas";

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.message };
    }

    return { success: "Register successful!" };
}