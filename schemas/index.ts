import { UserRole } from "@prisma/client";
import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(1, { message: "Password is required" }),
    code: z.optional(z.string())
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

export const newPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match", path: ["confirmPassword"],
});

export const settingsSchema = z.object({
    email: z.email().optional(),
    name: z.string().optional(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).optional(),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }).optional(),
    confirmNewPassword: z.string().min(8, { message: "Password must be at least 8 characters" }).optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match", path: ["confirmNewPassword"],
});
