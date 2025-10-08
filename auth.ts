import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from "@/auth.config"
import { db } from "@/lib/db"

import { getUserById } from "@/data/user"

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
        // async signIn({ user }) {
        //     if (!user.id) {
        //         return false;
        //     }

        //     const existingUser = await getUserById(user.id);

        //     if (!existingUser || !existingUser.emailVerified) {
        //         return false;
        //     }
            
        //     return true;
        // },
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            if (session.user && token.role) {
                session.user.role = token.role as "ADMIN" | "USER";
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
            }

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})