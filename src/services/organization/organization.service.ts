// ─── Organization Service ───────────────────────────────────────────────────
//
// Encapsulates all organization and invitation operations.
//
// Rules:
//  - All organization operations pass through this service layer.
//  - No UI, React logic, hooks, or routing calls allowed here.
//  - Encapsulates Better Auth SDK organization plugin calls.
//
// ─────────────────────────────────────────────────────────────────────────────

import { authClient } from "@/lib/auth/auth-client";
import type {
  AcceptInvitationValues,
  CreateOrganizationValues,
  InviteMemberValues,
  SetActiveOrganizationValues,
} from "@/types/auth";
import type { OrganizationSummary, UserInvitation } from "@/types/organization";

/**
 * Returns all organizations the currently authenticated user belongs to.
 */
export const listOrganizations = async (): Promise<OrganizationSummary[]> => {
  const { data, error } = await authClient.organization.list();

  if (error) {
    throw new Error(error.message ?? "Failed to list organizations.");
  }

  const organizations = data ?? [];

  return organizations.map((organization) => ({
    id: organization.id,
    name: organization.name,
    slug: organization.slug,
    logo: organization.logo,
  }));
};

/**
 * Returns all invitations received by the currently authenticated user.
 */
export const listUserInvitations = async (): Promise<UserInvitation[]> => {
  const { data, error } = await authClient.organization.listUserInvitations();

  if (error) {
    throw new Error(error.message ?? "Failed to list user invitations.");
  }

  const rawInvitations = data ?? [];

  return rawInvitations.map((invitation) => {
    const organizationName = "organizationName" in invitation ? invitation.organizationName : null;
    const organizationSlug = "organizationSlug" in invitation ? invitation.organizationSlug : null;

    return {
      id: invitation.id,
      organizationId: invitation.organizationId,
      organizationName: typeof organizationName === "string" ? organizationName : null,
      organizationSlug: typeof organizationSlug === "string" ? organizationSlug : null,
      email: invitation.email,
      role: invitation.role,
      status: invitation.status,
      expiresAt: invitation.expiresAt ?? null,
      createdAt: invitation.createdAt ?? null,
      inviterId: invitation.inviterId ?? null,
    };
  });
};

/**
 * Creates a new organization owned by the currently authenticated user.
 */
export const createOrganization = async (
  form: CreateOrganizationValues,
): Promise<OrganizationSummary> => {
  const { data, error } = await authClient.organization.create({
    name: form.name,
    slug: form.slug,
    logo: form.logo,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to create organization.");
  }

  if (!data) {
    throw new Error("No organization data returned from creation.");
  }

  return {
    id: data.id,
    name: data.name,
    slug: data.slug,
    logo: data.logo,
  };
};

/**
 * Accepts a pending invitation by its explicit invitation ID.
 */
export const acceptInvitation = async (
  form: AcceptInvitationValues,
): Promise<unknown> => {
  const { data, error } = await authClient.organization.acceptInvitation({
    invitationId: form.invitationId,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to accept invitation.");
  }

  return data;
};

/**
 * Sets the given organization as the user's active organization.
 */
export const setActiveOrganization = async (
  form: SetActiveOrganizationValues,
): Promise<unknown> => {
  const { data, error } = await authClient.organization.setActive({
    organizationId: form.organizationId,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to set active organization.");
  }

  return data;
};

/**
 * Sends an invitation to join an organization.
 */
export const inviteMember = async (form: InviteMemberValues) => {
  const { data, error } = await authClient.organization.inviteMember({
    email: form.email,
    role: form.role,
    organizationId: form.organizationId,
  });

  if (error) {
    throw new Error(error.message ?? "Failed to invite member.");
  }

  return data;
};
