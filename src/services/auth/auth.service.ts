// ─── Auth Service ─────────────────────────────────────────────────────────────
//
// This is the single abstraction layer between the application and Better Auth.
//
// Rules:
//  - All auth operations pass through this file.
//  - No React logic, JSX, routing, or toast notifications.
//  - No Axios. No manual session management.
//  - Better Auth responses are returned directly to the caller.
//
// ─────────────────────────────────────────────────────────────────────────────

import { authClient } from "@/lib/auth/auth-client";

import {
    type AcceptInvitationValues,
    type CreateOrganizationValues,
    type InviteMemberValues,
    type SetActiveOrganizationValues,
    type SignInEmailValues,
    type SignUpEmailValues,
} from "@/types/auth";

// ─── Authentication ───────────────────────────────────────────────────────────

/**
 * Registers a new user account via email and password.
 * The confirmPassword field is a UI-only concern and is intentionally excluded
 * from the network request.
 */
export const signUpUser = async (form: SignUpEmailValues) => {
    return authClient.signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
    });
};

/**
 * Signs an existing user in via email and password.
 * Better Auth manages the resulting session cookie automatically.
 */
export const signInUser = async (form: SignInEmailValues) => {
    return authClient.signIn.email({
        email: form.email,
        password: form.password,
    });
};

/**
 * Signs the current user out and invalidates the active session cookie.
 */
export const signOutUser = async () => {
    return authClient.signOut();
};

/**
 * Retrieves the current authenticated session.
 * Returns null when no active session exists.
 */
export const getSession = async () => {
    return authClient.getSession();
};

// ─── Organization ─────────────────────────────────────────────────────────────

/**
 * Creates a new organization owned by the currently authenticated user.
 */
export const createOrganization = async (form: CreateOrganizationValues) => {
    return authClient.organization.create({
        name: form.name,
        slug: form.slug,
        logo: form.logo,
    });
};

/**
 * Sets the given organization as the user's active organization.
 * Pass null to clear the active organization.
 */
export const setActiveOrganization = async (form: SetActiveOrganizationValues) => {
    return authClient.organization.setActive({
        organizationId: form.organizationId,
    });
};

/**
 * Returns all organizations the currently authenticated user belongs to.
 */
export const listOrganizations = async () => {
    return authClient.organization.list();
};

/**
 * Sends an invitation to join an organization to the specified email address.
 */
export const inviteMember = async (form: InviteMemberValues) => {
    return authClient.organization.inviteMember({
        email: form.email,
        role: form.role as Parameters<typeof authClient.organization.inviteMember>[0]["role"],
        organizationId: form.organizationId,
    });
};

/**
 * Accepts a pending invitation by its ID.
 * The authenticated user must be the recipient of the invitation.
 */
export const acceptInvitation = async (form: AcceptInvitationValues) => {
    return authClient.organization.acceptInvitation({
        invitationId: form.invitationId,
    });
};