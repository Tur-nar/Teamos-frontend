import { authClient } from "@/lib/auth/auth-client";

export type InvitationRole = "admin" | "supervisor" | "member";

export const organizationService = {
  async list() {
    const { data, error } = await authClient.organization.list();
    if (error) {
      throw new Error(error.message ?? error.statusText);
    }
    return data ?? [];
  },

  async create(input: {
    name: string;
    slug: string;
    logo?: string;
    brandColor?: string;
  }) {
    const { data, error } = await authClient.organization.create(input);
    if (error) {
      throw new Error(error.message ?? error.statusText);
    }
    if (!data) {
      throw new Error("Organization creation returned no organization.");
    }
    return data;
  },

  async setActive(organizationId: string) {
    const { data, error } = await authClient.organization.setActive({ organizationId });
    if (error) {
      throw new Error(error.message ?? error.statusText);
    }
    return data;
  },

  async inviteMember(input: { email: string; role: InvitationRole }) {
    const { data, error } = await authClient.organization.inviteMember(input);
    if (error) {
      throw new Error(error.message ?? error.statusText);
    }
    return data;
  },

  async listUserInvitations() {
    const { data, error } = await authClient.organization.listUserInvitations();
    if (error) {
      throw new Error(error.message ?? error.statusText);
    }
    return data ?? [];
  },

  async acceptInvitation(invitationId: string) {
    const { data, error } = await authClient.organization.acceptInvitation({ invitationId });
    if (error) {
      throw new Error(error.message ?? error.statusText);
    }
    return data;
  },
};