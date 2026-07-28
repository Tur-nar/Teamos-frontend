"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";

type SessionData = typeof authClient.$Infer.Session;
type Session = SessionData["session"];
type User = SessionData["user"];

export type AuthContextValue = {
    session: Session | null;
    user: User | null;
    loading: boolean;
    refreshSession: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

/**
 * Single source of truth for fetching session data from Better Auth SDK.
 * Handles error logging and fallback data structure.
 */
async function fetchSessionData(): Promise<{ session: Session | null; user: User | null }> {
    try {
        const { data } = await authClient.getSession();
        if (data) {
            return { session: data.session, user: data.user };
        }
        return { session: null, user: null };
    } catch (error) {
        console.error(error);
        return { session: null, user: null };
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        fetchSessionData().then(({ session: nextSession, user: nextUser }) => {
            if (isMounted) {
                setSession(nextSession);
                setUser(nextUser);
                setLoading(false);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    const refreshSession = useCallback(async () => {
        setLoading(true);
        const { session: nextSession, user: nextUser } = await fetchSessionData();
        setSession(nextSession);
        setUser(nextUser);
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                session,
                user,
                loading,
                refreshSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
