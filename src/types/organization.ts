import { authClient } from "@/lib/auth/auth-client";

type OrganizationListResult = Awaited<ReturnType<typeof authClient.organization.list>>;
type UserInvitationListResult = Awaited<ReturnType<typeof authClient.organization.listUserInvitations>>;
type OrganizationRecord = NonNullable<OrganizationListResult["data"]>[number];
type InvitationRecord = NonNullable<UserInvitationListResult["data"]>[number];

export type OrganizationSummary = Pick<
  OrganizationRecord,
  "id" | "name" | "slug" | "logo"
>;

export type OrganizationListResponse = {
  organizations: OrganizationSummary[];
};

export type UserInvitation = {
  id: InvitationRecord["id"];
  organizationId: InvitationRecord["organizationId"];
  organizationName?: string | null;
  organizationSlug?: string | null;
  email: InvitationRecord["email"];
  role: InvitationRecord["role"];
  status: InvitationRecord["status"];
  expiresAt: InvitationRecord["expiresAt"] | null;
  createdAt: InvitationRecord["createdAt"] | null;
  inviterId?: InvitationRecord["inviterId"] | null;
};

