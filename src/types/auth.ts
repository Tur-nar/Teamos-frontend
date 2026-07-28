// ─── Authentication Input Types ───────────────────────────────────────────────

export type SignUpEmailValues = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type SignInEmailValues = {
    email: string;
    password: string;
};

// ─── Organization Input Types ─────────────────────────────────────────────────

/**
 * Organization member roles defined by the backend RBAC specification.
 */
export type OrganizationMemberRole = "owner" | "admin" | "supervisor" | "member";

export type CreateOrganizationValues = {
    name: string;
    slug: string;
    logo?: string | null;
};

export type SetActiveOrganizationValues = {
    organizationId: string | null;
};

export type InviteMemberValues = {
    email: string;
    role: OrganizationMemberRole;
    organizationId?: string;
};

export type AcceptInvitationValues = {
    invitationId: string;
};