import { authClient } from "@/lib/auth/auth-client";
import type {
    AcceptInvitationValues,
    CreateOrganizationValues,
    InviteMemberValues,
    SetActiveOrganizationValues,
} from "@/types/auth";
import type { OrganizationSummary, UserInvitation } from "@/types/organization";

export const ListOrganizationsApi = async (): Promise<OrganizationSummary[]> => {
    const { data, error } = await authClient.organization.list();

    if (error) {
        throw new Error(error.message ?? "Failed to list organizations.");
    }

    return (data ?? []).map((org) => ({
        id: org.id,
        name: org.name,
        slug: org.slug,
        logo: org.logo,
    }));
};

export const ListUserInvitationsApi = async (): Promise<UserInvitation[]> => {
    const { data, error } = await authClient.organization.listUserInvitations();

    if (error) {
        throw new Error(error.message ?? "Failed to list invitations.");
    }

    return (data ?? []).map((inv) => {
        const organizationName = "organizationName" in inv ? inv.organizationName : null;
        const organizationSlug = "organizationSlug" in inv ? inv.organizationSlug : null;

        return {
            id: inv.id,
            organizationId: inv.organizationId,
            organizationName: typeof organizationName === "string" ? organizationName : null,
            organizationSlug: typeof organizationSlug === "string" ? organizationSlug : null,
            email: inv.email,
            role: inv.role,
            status: inv.status,
            expiresAt: inv.expiresAt ?? null,
            createdAt: inv.createdAt ?? null,
            inviterId: inv.inviterId ?? null,
        };
    });
};

export const CreateOrganizationApi = async (
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

export const AcceptInvitationApi = async (
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
 * Sets the given organization as the user's active workspace.
 */
export const SetActiveOrganizationApi = async (
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

export const InviteMemberApi = async (form: InviteMemberValues) => {
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
