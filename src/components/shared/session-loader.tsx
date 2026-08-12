"use client";

import { useEffect, useState } from "react";

const LETTERS = ["T", "e", "a", "m", "O", "s"];

export default function SessionLoader() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const frame = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div
                className="absolute h-64 w-64 rounded-full opacity-0 blur-[80px] transition-opacity duration-1000"
                style={{
                    background: "radial-gradient(circle, var(--brand-glow) 0%, transparent 70%)",
                    opacity: mounted ? 0.6 : 0,
                }}
            />

            <div
                className="absolute h-32 w-32 rounded-full border opacity-0 transition-all duration-700"
                style={{
                    borderColor: "color-mix(in srgb, var(--brand) 20%, transparent)",
                    opacity: mounted ? 1 : 0,
                    animation: mounted ? "session-orbit 3s linear infinite" : "none",
                }}
            >
                <div
                    className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
                    style={{ background: "var(--brand)" }}
                />
            </div>

            <div
                className="absolute h-24 w-24 rounded-full border opacity-0 transition-all duration-700 delay-200"
                style={{
                    borderColor: "color-mix(in srgb, var(--brand) 12%, transparent)",
                    opacity: mounted ? 1 : 0,
                    animation: mounted ? "session-orbit 2.4s linear infinite reverse" : "none",
                }}
            >
                <div
                    className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
                    style={{ background: "var(--brand)", opacity: 0.6 }}
                />
            </div>

            <div className="relative flex flex-col items-center gap-6">
                <div className="flex items-baseline gap-0" aria-label="TeamOs">
                    {LETTERS.map((letter, i) => {
                        const isUppercase = letter === letter.toUpperCase() && letter !== letter.toLowerCase();
                        return (
                            <span
                                key={i}
                                className="inline-block transition-all"
                                style={{
                                    fontSize: isUppercase ? "2rem" : "1.5rem",
                                    fontWeight: isUppercase ? 700 : 500,
                                    fontFamily: "var(--font-poppins), var(--font-sans), sans-serif",
                                    letterSpacing: "-0.02em",
                                    color: isUppercase ? "var(--brand)" : "var(--foreground)",
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted
                                        ? "translateY(0) scale(1)"
                                        : "translateY(12px) scale(0.8)",
                                    transitionDelay: `${150 + i * 80}ms`,
                                    transitionDuration: "600ms",
                                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                                }}
                            >
                                {letter}
                            </span>
                        );
                    })}
                </div>

                <div
                    className="relative h-0.5 w-32 overflow-hidden rounded-full transition-all duration-500"
                    style={{
                        background: "color-mix(in srgb, var(--brand) 15%, transparent)",
                        opacity: mounted ? 1 : 0,
                        transitionDelay: "700ms",
                    }}
                >
                    <div
                        className="absolute inset-y-0 left-0 w-1/3 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, transparent, var(--brand), transparent)",
                            animation: mounted ? "session-shimmer 1.5s ease-in-out infinite" : "none",
                            animationDelay: "800ms",
                        }}
                    />
                </div>

                <p
                    className="text-xs tracking-[0.2em] uppercase transition-all duration-500"
                    style={{
                        color: "var(--muted-foreground)",
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? "translateY(0)" : "translateY(4px)",
                        transitionDelay: "900ms",
                    }}
                >
                    Initializing...
                </p>
            </div>

            <style jsx>{`
                @keyframes session-orbit {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes session-shimmer {
                    0% { transform: translateX(-150%); }
                    100% { transform: translateX(450%); }
                }
            `}</style>
        </div>
    );
}
