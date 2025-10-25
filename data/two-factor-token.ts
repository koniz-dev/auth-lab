import {db} from "@/lib/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email },
        });

        return twoFactorToken;
    } catch (error) {
        console.error("Error fetching two factor token by email:", error);
        return null;
    }
}

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token },
        });

        return twoFactorToken;
    } catch (error) {
        console.error("Error fetching two factor token by token:", error);
        return null;
    }
}