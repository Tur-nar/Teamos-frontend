import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";
import { ROUTES, isProtectedRoute, isAuthPage } from "@/constants/routes";

function redirectTo(pathname: string, request: NextRequest) {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    url.search = "";
    return NextResponse.redirect(url);
}

export function proxy(request: NextRequest) {
    const sessionToken = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    if (isProtectedRoute(pathname) && !sessionToken) {
        return redirectTo(ROUTES.auth.signIn, request);
    }

    if (isAuthPage(pathname) && sessionToken) {
        return redirectTo(ROUTES.dashboard, request);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/onboarding/:path*",
        "/sign-in",
        "/sign-up",
    ],
};