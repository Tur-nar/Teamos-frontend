const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "") ?? "";

export const API_ORIGIN = configuredApiUrl.endsWith("/api")
  ? configuredApiUrl.slice(0, -"/api".length)
  : configuredApiUrl;

export const AUTH_BASE_PATH = "/api/auth";
export const NEST_API_BASE_URL = `${API_ORIGIN}/api/v1`;