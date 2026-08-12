import { NextResponse } from "next/server";

export function proxy() {
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