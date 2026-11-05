import { createAuthClient } from "better-auth/react";
import { organizationClient } from "better-auth/client/plugins";
import { role } from "better-auth/plugins/access";
import { adminAc, memberAc, ownerAc } from "better-auth/plugins/organization/access";

import { API_ORIGIN, AUTH_BASE_PATH } from "@/lib/api-config";

export const authClient = createAuthClient({
  baseURL: API_ORIGIN || undefined,
  basePath: AUTH_BASE_PATH,
  plugins: [
    organizationClient({
      roles: {
        admin: adminAc,
        // Client inference only; the backend remains authoritative for supervisor access.
        supervisor: role({}),
        member: memberAc,
        owner: ownerAc,
      },
      schema: {
        organization: {
          additionalFields: {
            brandColor: { type: "string", required: false, input: true },
          },
        },
      },
    }),
  ],
});

export type SessionData = typeof authClient.$Infer.Session;
export type User = SessionData["user"] & { onboarded?: boolean };
export type Session = SessionData["session"];