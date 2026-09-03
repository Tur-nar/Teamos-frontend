export const ROUTES = {
  home: "/",
  auth: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
  dashboard: "/dashboard",
  onboarding: "/onboarding",
} as const;

type Access = "public" | "protected" | "auth-only";

interface RouteEntry {
  path: string;
  matchesPrefix?: boolean;
  access: Access;
}

const ROUTE_REGISTRY: RouteEntry[] = [
  { path: ROUTES.dashboard, matchesPrefix: true, access: "protected" },
  { path: ROUTES.onboarding, matchesPrefix: true, access: "protected" },
  { path: ROUTES.auth.signIn, access: "auth-only" },
  { path: ROUTES.auth.signUp, access: "auth-only" },
];

function matches(entry: RouteEntry, pathname: string): boolean {
  if (entry.matchesPrefix) {
    return pathname === entry.path || pathname.startsWith(`${entry.path}/`);
  }
  return pathname === entry.path;
}

export function isProtectedRoute(pathname: string): boolean {
  return ROUTE_REGISTRY.some(
    (entry) => entry.access === "protected" && matches(entry, pathname),
  );
}

export function isAuthPage(pathname: string): boolean {
  return ROUTE_REGISTRY.some(
    (entry) => entry.access === "auth-only" && matches(entry, pathname),
  );
}
