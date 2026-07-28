import { createAccessControl } from "better-auth/plugins/access";

export const statement = {
    organization: ["update", "delete"],
    member: ["create", "update", "remove"],
    invitation: ["create", "cancel"],
    department: ["create", "update", "delete"],
    task: ["create", "update", "delete", "assign"],
    target: ["create", "update", "delete"],
    performance: ["view", "recalculate"],
    complaint: ["review", "resolve", "dismiss"],
} as const;

export const ac = createAccessControl(statement);

export const owner = ac.newRole({
    organization: ["update", "delete"],
    member: ["create", "update", "remove"],
    invitation: ["create", "cancel"],
    department: ["create", "update", "delete"],
    task: ["create", "update", "delete", "assign"],
    target: ["create", "update", "delete"],
    performance: ["view", "recalculate"],
    complaint: ["review", "resolve", "dismiss"],
});

export const admin = ac.newRole({
    organization: ["update"],
    member: ["create", "update", "remove"],
    invitation: ["create", "cancel"],
    department: ["create", "update", "delete"],
    task: ["create", "update", "delete", "assign"],
    target: ["create", "update", "delete"],
    performance: ["view", "recalculate"],
    complaint: ["review", "resolve", "dismiss"],
});

export const supervisor = ac.newRole({
    invitation: ["create"],
    department: ["update"],
    task: ["create", "update", "assign"],
    target: ["create", "update"],
    performance: ["view"],
});

export const member = ac.newRole({
    task: ["update"],
});

export const roles = {
    owner,
    admin,
    supervisor,
    member,
};
