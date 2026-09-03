import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { ac, roles } from "@/lib/auth/access-control";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [
        organizationClient({
            ac,
            roles,
        }),
    ],
});

export type Session = typeof authClient.$Infer.Session;
export type SessionUser = Session["user"] & {
    onboarded: boolean;
};
export function asSessionUser(user: Session["user"] | null | undefined): SessionUser | null {
    if (!user) return null;
    return user as SessionUser;
}