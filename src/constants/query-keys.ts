export const organizationKeys = {
    all: ["organizations"] as const,
    list: () => [...organizationKeys.all, "list"] as const,
    invitations: () => [...organizationKeys.all, "invitations"] as const,
};
