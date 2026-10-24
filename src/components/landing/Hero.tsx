"use client";

import Section from "@/components/layout/section";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import Reveal from "@/components/common/Reveal";

const stats = [
  { value: "4.9/5", label: "Customer rating" },
  { value: "10K+", label: "Tasks managed" },
  { value: "500+", label: "Teams onboarded" },
];

export default function Hero() {
  return (
    <Section className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-24">
      <div className="absolute inset-x-0 top-0 -z-10 h- 128 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_55%)]" />

      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <Reveal className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Trusted by 500+ growing teams
          </div>

          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Build momentum with a workspace that feels as sharp as your team.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Organize projects, align workstreams, and keep every milestone visible in one premium command center designed for fast-moving teams.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="h-11 px-5 shadow-[0_10px_30px_rgba(34,211,238,0.18)] transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="h-11 px-5 transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.01]">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-border/70 pt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-0.5 text-(--rating)">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="font-semibold text-foreground">4.9/5</span>
            </div>
            {stats.slice(1).map((stat) => (
              <div key={stat.label}>
                <p className="font-semibold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative mx-auto w-full max-w-xl" delay={180}>
          <div className="absolute left-1/2 top-6 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/30 blur-[120px]" />
          <div className="animate-float rounded-[2rem] border border-border/80 bg-card/80 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-6">
            <div className="rounded-[1.5rem] border border-border/70 bg-background/70 p-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary">Operations Overview</p>
                  <h3 className="text-xl font-semibold text-foreground">Welcome back, Solomon</h3>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                  S
                </div>
              </div>

              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Today&apos;s Tasks</p>
                    <p className="text-sm text-muted-foreground">A focused plan for the day</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    3 active
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Landing page polish", status: "Done", tone: "text-primary" },
                    { title: "Weekly planning sync", status: "2:00 PM", tone: "text-amber-500" },
                    { title: "Design review", status: "In progress", tone: "text-foreground" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-center justify-between rounded-xl border border-border/70 bg-background/70 px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`h-4 w-4 ${item.tone}`} />
                        <span className="text-sm text-foreground">{item.title}</span>
                      </div>
                      <span className={`text-xs font-medium ${item.tone}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-border/70 bg-card p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Team Activity</p>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Solomon", initials: "ST", tone: "bg-primary text-primary-foreground" },
                      { name: "Ada", initials: "AD", tone: "bg-secondary text-foreground" },
                      { name: "John", initials: "JH", tone: "bg-secondary text-foreground" },
                    ].map((person) => (
                      <div key={person.name} className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${person.tone}`}>
                          {person.initials}
                        </div>
                        <span className="text-sm text-foreground">{person.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card p-4">
                  <p className="text-sm font-semibold text-foreground">Quick Stats</p>
                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Completed tasks", value: "24" },
                      { label: "Active projects", value: "6" },
                      { label: "Team members", value: "12" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-border/60 bg-background/70 px-3 py-2.5">
                        <p className="text-xl font-semibold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}