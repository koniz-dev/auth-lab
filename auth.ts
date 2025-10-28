import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"

import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { UserRole } from "@prisma/client"
import { getAccountByUserId } from "./data/account"

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") {
                return true;
            }

            const existingUser = await getUserById(user.id as string);
            
            // Check if user exists and email is verified
            if (!existingUser?.emailVerified) {
                return false;
            }

            // If two-factor is enabled, require confirmation
            if (existingUser.isTwoFactorEnabled) {
                const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
                
                if (!twoFactorConfirmation) {
                    return false;
                }
                
                // Clean up the confirmation after successful verification
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorConfirmation.id },
                });
            }

            return true;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
                if (token.sub) session.user.id = token.sub;
                if (token.role) session.user.role = token.role as UserRole;
                if (token.isTwoFactorEnabled) session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            const user = await getUserById(token.sub);

            if (!user) return token;

            const account = await getAccountByUserId(user.id);

            token.isOAuth = !!account;
            token.name = user.name;
            token.email = user.email;
            token.role = user.role;
            token.isTwoFactorEnabled = user.isTwoFactorEnabled;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})