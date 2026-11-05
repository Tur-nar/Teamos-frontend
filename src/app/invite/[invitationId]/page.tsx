import { InvitationAcceptance } from "@/features/organizations/components/invitation-acceptance";

export default async function InvitationPage({ params }: { params: Promise<{ invitationId: string }> }) {
  const { invitationId } = await params;
  return <InvitationAcceptance invitationId={invitationId} />;
}