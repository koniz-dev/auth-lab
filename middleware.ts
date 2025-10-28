import { NextRequest, NextResponse } from "next/server"
import { publicRoutes, protectedRoutes, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "@/routes"

export default function middleware(req: NextRequest) {
    const { nextUrl } = req
    
    // Get token from cookies instead of using NextAuth middleware
    const token = req.cookies.get("authjs.session-token") || req.cookies.get("__Secure-authjs.session-token")
    const isLoggedIn = !!token?.value

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isProtectedRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return NextResponse.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    return NextResponse.next();
}

// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"],
}