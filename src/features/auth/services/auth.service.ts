import { authClient } from "@/lib/auth/auth-client";

type AuthError = NonNullable<Awaited<ReturnType<typeof authClient.getSession>>["error"]>;

function throwIfAuthError(error: AuthError | null) {
  if (error) {
    throw new Error(error.message ?? error.statusText);
  }
}

export const authService = {
  async getSession() {
    const { data, error } = await authClient.getSession();
    throwIfAuthError(error);
    return data;
  },

  async signUp(input: { name: string; email: string; password: string }) {
    const { data, error } = await authClient.signUp.email(input);
    throwIfAuthError(error);
    return data;
  },

  async signIn(input: { email: string; password: string }) {
    const { data, error } = await authClient.signIn.email(input);
    throwIfAuthError(error);
    return data;
  },

  async signOut() {
    const { data, error } = await authClient.signOut();
    throwIfAuthError(error);
    return data;
  },
};