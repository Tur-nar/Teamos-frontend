import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";

console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    plugins: [
        organizationClient()
    ]
});