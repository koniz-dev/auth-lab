"use server";

import { z } from "zod";
import bcrypt from "bcrypt";

import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof registerSchema>) => {
    const validatedFields = registerSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: validatedFields.error.message };
    }

    const { email, name, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    await db.user.create({
        data: { email, name, password: hashedPassword },
    });

    return { success: "User created successfully!" };
}