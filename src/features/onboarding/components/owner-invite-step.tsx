"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowRight, Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { useInviteMember } from "@/features/organizations/hooks/use-invitations";
import type { InvitationRole } from "@/features/organizations/services/organization.service";

type InviteRow = { id: string; email: string; role: InvitationRole };
type OwnerInviteStepProps = { completeOnboarding: () => Promise<void> };

function isInvitationRole(value: string): value is InvitationRole {
  return value === "admin" || value === "supervisor" || value === "member";
}

export function OwnerInviteStep({ completeOnboarding }: OwnerInviteStepProps) {
  const router = useRouter();
  const completingRef = useRef(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const inviteMember = useInviteMember();
  const [rows, setRows] = useState<InviteRow[]>([{ id: "1", email: "", role: "member" }]);
  const [nextRowId, setNextRowId] = useState(2);
  const [sentCount, setSentCount] = useState(0);
  const [failures, setFailures] = useState<string[]>([]);
  const [completeError, setCompleteError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function finish() {
    if (completingRef.current) return;
    completingRef.current = true;
    setIsCompleting(true);
    setCompleteError(null);
    try {
      await completeOnboarding();
      router.replace("/dashboard");
    } catch (error) {
      setCompleteError(error instanceof Error ? error.message : "Could not complete onboarding. Try again.");
    } finally {
      completingRef.current = false;
      setIsCompleting(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFailures([]);
    setIsSubmitting(true);
    const failed: InviteRow[] = [];
    const invitations = rows.filter((row) => row.email.trim());

    try {
      for (const invitation of invitations) {
        try {
          await inviteMember.mutateAsync({ email: invitation.email.trim(), role: invitation.role });
          setRows((current) => current.filter((row) => row.id !== invitation.id));
          setSentCount((current) => current + 1);
        } catch (error) {
          failed.push(invitation);
          setFailures((current) => [...current, `${invitation.email}: ${error instanceof Error ? error.message : "Invitation failed."}`]);
        }
      }

      if (failed.length) {
        setRows(failed);
      } else {
        await finish();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-3 max-w-2xl">
      <p className="text-xs font-semibold uppercase text-[#3a7552]">Final step</p>
      <h1 className="mt-3 text-3xl font-semibold">Invite your teammates</h1>
      <p className="mt-3 text-sm leading-6 text-[#667168]">Invite 1–5 teammates now, or skip this and invite them later.</p>

      {failures.length > 0 ? (
        <div className="mt-7 border border-[#d6aaa0] bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold">Some invitations could not be sent.</p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#8a3527]">
            {failures.map((failure) => <li key={failure}>{failure}</li>)}
          </ul>
          {completeError && <p className="mt-4 text-sm text-[#8a3527]" role="alert">{completeError}</p>}
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="h-10 rounded border border-[#cdd5ce] px-4 text-sm font-medium hover:bg-[#f5f7f4] disabled:opacity-60" disabled={isCompleting} onClick={finish} type="button">Continue to dashboard</button>
            <button className="h-10 rounded bg-[#22583a] px-4 text-sm font-semibold text-white disabled:opacity-60" disabled={inviteMember.isPending} onClick={() => setFailures([])} type="button">Review invites</button>
          </div>
        </div>
      ) : (
        <form className="mt-7 space-y-4 border border-[#d9e0d9] bg-white p-5 sm:p-7" onSubmit={handleSubmit}>
          {rows.map((row, index) => (
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px_40px]" key={row.id}>
              <label className="block text-sm font-medium">
                Teammate email {index === 0 && <span className="font-normal text-[#667168]">(optional)</span>}
                <input autoComplete="email" className="mt-2 h-10 w-full rounded border border-[#cdd5ce] px-3 text-sm outline-none focus:border-[#35724d] focus:ring-2 focus:ring-[#35724d]/20" onChange={(event) => setRows((current) => current.map((item) => item.id === row.id ? { ...item, email: event.target.value } : item))} type="email" value={row.email} />
              </label>
              <label className="block text-sm font-medium">
                Role
                <select className="mt-2 h-10 w-full rounded border border-[#cdd5ce] bg-white px-2 text-sm outline-none focus:border-[#35724d] focus:ring-2 focus:ring-[#35724d]/20" onChange={(event) => { const role = event.target.value; if (isInvitationRole(role)) setRows((current) => current.map((item) => item.id === row.id ? { ...item, role } : item)); }} value={row.role}>
                  <option value="admin">Admin</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="member">Member</option>
                </select>
              </label>
              <div className="flex items-end">
                {rows.length > 1 && <button aria-label={`Remove invitation ${index + 1}`} className="grid size-10 place-items-center rounded border border-[#cdd5ce] text-[#667168] hover:bg-[#f5f7f4]" onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))} type="button"><X aria-hidden="true" size={16} /></button>}
              </div>
            </div>
          ))}

          {rows.length + sentCount < 5 && <button className="inline-flex h-9 items-center gap-2 rounded border border-[#cdd5ce] px-3 text-sm font-medium text-[#355f42] hover:bg-[#f5f7f4]" onClick={() => { setRows((current) => [...current, { id: String(nextRowId), email: "", role: "member" }]); setNextRowId((current) => current + 1); }} type="button"><Plus aria-hidden="true" size={16} /> Add teammate</button>}
          {completeError && <p className="text-sm text-[#8a3527]" role="alert">{completeError}</p>}
          <div className="flex flex-col gap-3 border-t border-[#e2e8e2] pt-5 sm:flex-row">
            <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded bg-[#22583a] px-4 text-sm font-semibold text-white hover:bg-[#19472e] disabled:opacity-60" disabled={isSubmitting || isCompleting} type="submit">
              {isCompleting ? "Completing..." : isSubmitting ? "Sending invitations..." : failures.length ? "Retry failed invitations" : "Send invitations and finish"}
              {!isSubmitting && <ArrowRight aria-hidden="true" size={16} />}
            </button>
            <button className="h-11 rounded border border-[#cdd5ce] px-4 text-sm font-medium hover:bg-[#f5f7f4] disabled:opacity-60" disabled={isSubmitting || isCompleting} onClick={finish} type="button">Skip</button>
          </div>
        </form>
      )}
    </section>
  );
}