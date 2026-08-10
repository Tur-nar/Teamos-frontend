import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import {
  ROUTES,
  isAuthPage,
  isProtectedRoute,
} from "@/constants/routes";

function redirectTo(pathname: string, request: NextRequest) {
  const url = request.nextUrl.clone();

  url.pathname = pathname;
  url.search = "";

  return NextResponse.redirect(url);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = Boolean(getSessionCookie(request));

  // Redirect unauthenticated users away from protected routes.
  if (isProtectedRoute(pathname) && !hasSession) {
    return redirectTo(ROUTES.auth.signIn, request);
  }

  // Redirect authenticated users away from authentication pages.
  if (isAuthPage(pathname) && hasSession) {
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