import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
    email: z.email(),
    name: z.string().min(1, { message: "Name is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"],
});

export const resetSchema = z.object({
    email: z.email(),
});