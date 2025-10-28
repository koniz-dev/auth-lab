import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"

import { getUserById } from "@/data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"

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
            if (account?.provider === "credentials") {
                const existingUser = await getUserById(user.id as string);

                if (!existingUser || !existingUser.emailVerified) {
                    return false;
                }

                if (!existingUser.isTwoFactorEnabled) {
                    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                    if (!twoFactorConfirmation) {
                        return false;
                    }
                    
                    await db.twoFactorConfirmation.delete({
                        where: { id: twoFactorConfirmation.id },
                    });
                }
            }

            return true;
        },
        async session({ session, token }) {
            if (session.user) {
                if (token.sub) session.user.id = token.sub;
                if (token.role) session.user.role = token.role as "ADMIN" | "USER";
                if (token.isTwoFactorEnabled) session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            const user = await getUserById(token.sub);

            if (user) {
                token.role = user.role;
                token.isTwoFactorEnabled = user.isTwoFactorEnabled;
            }

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})