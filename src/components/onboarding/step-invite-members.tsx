"use client";

import { useState } from "react";
import { Plus, X, Send, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OrganizationMemberRole } from "@/types/auth";

type InviteRow = { id: string; email: string; role: OrganizationMemberRole };
type InviteError = { id: string; message: string };

type StepInviteMembersProps = {
    organizationId: string;
    onInvite: (rows: { email: string; role: OrganizationMemberRole }[]) => Promise<InviteError[]>;
    onSkip: () => void;
    isSending: boolean;
};

const ROLES: { label: string; value: OrganizationMemberRole }[] = [
    { label: "Member", value: "member" },
    { label: "Supervisor", value: "supervisor" },
    { label: "Admin", value: "admin" },
];

function makeRow(): InviteRow {
    return { id: Math.random().toString(36).slice(2), email: "", role: "member" };
}

export function StepInviteMembers({ onInvite, onSkip, isSending }: StepInviteMembersProps) {
    const [rows, setRows] = useState<InviteRow[]>([makeRow()]);
    const [errors, setErrors] = useState<InviteError[]>([]);
    const [sent, setSent] = useState<string[]>([]);

    function addRow() {
        if (rows.length >= 5) return;
        setRows((prev) => [...prev, makeRow()]);
    }

    function removeRow(id: string) {
        setRows((prev) => prev.filter((r) => r.id !== id));
    }

    function updateRow(id: string, field: "email" | "role", value: string) {
        setRows((prev) =>
            prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
        );
    }

    async function handleSend() {
        const valid = rows.filter((r) => r.email.trim().includes("@"));
        if (valid.length === 0) {
            onSkip();
            return;
        }

        const errs = await onInvite(valid.map((r) => ({ email: r.email.trim(), role: r.role })));
        setErrors(errs);

        const failedEmails = new Set(errs.map((e) => e.id));
        const succeededEmails = valid.filter((r) => !failedEmails.has(r.id)).map((r) => r.email);
        setSent(succeededEmails);

        // If all successes, navigate automatically
        if (errs.length === 0) {
            onSkip(); // onSkip here means "continue" since invites are done
        }
    }

    const errorById = new Map(errors.map((e) => [e.id, e.message]));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Invite your team</CardTitle>
                <CardDescription>
                    Add up to 5 teammates now. You can always invite more from the dashboard.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                {sent.length > 0 && (
                    <p className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
                        Invites sent to: {sent.join(", ")}
                    </p>
                )}

                <div className="space-y-3">
                    {rows.map((row) => (
                        <div key={row.id} className="space-y-1">
                            <div className="flex gap-2">
                                <Input
                                    id={`invite-email-${row.id}`}
                                    type="email"
                                    placeholder="colleague@company.com"
                                    value={row.email}
                                    onChange={(e) => updateRow(row.id, "email", e.target.value)}
                                    className="flex-1"
                                    aria-label="Invite email"
                                />
                                <select
                                    id={`invite-role-${row.id}`}
                                    value={row.role}
                                    onChange={(e) =>
                                        updateRow(row.id, "role", e.target.value)
                                    }
                                    className="h-9 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                    aria-label="Member role"
                                >
                                    {ROLES.map((r) => (
                                        <option key={r.value} value={r.value}>
                                            {r.label}
                                        </option>
                                    ))}
                                </select>
                                {rows.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeRow(row.id)}
                                        aria-label="Remove invite row"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                            {errorById.has(row.id) && (
                                <p className="text-xs text-destructive">
                                    {errorById.get(row.id)}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                {rows.length < 5 && (
                    <Button type="button" variant="outline" size="sm" onClick={addRow}>
                        <Plus className="mr-1.5 h-3.5 w-3.5" />
                        Add another
                    </Button>
                )}

                <div className="flex flex-col gap-2 pt-2">
                    <Button onClick={() => void handleSend()} disabled={isSending} className="w-full">
                        <Send className="mr-2 h-4 w-4" />
                        {isSending ? "Sending…" : "Send invites and continue"}
                    </Button>
                    <Button variant="ghost" className="w-full" onClick={onSkip} disabled={isSending}>
                        Skip for now
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
