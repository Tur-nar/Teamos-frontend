"use client";

import { motion } from "framer-motion";
import Link from "next/link"

export default function BrandPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      className="hidden lg:flex flex-col justify-between rounded-3xl border border-border bg-card p-10 brand-glow"
    >
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div>
            <Link href="/">
              <h1 className="text-2xl font-bold">
                  TM Management
              </h1>

              <p className="text-sm text-muted-foreground">
                AI Powered Workspace
              </p>
            </Link>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Manage Teams.
            <br />
            Build Faster.
            <br />
            Scale Together.
          </h2>

          <p className="max-w-md leading-7 text-muted-foreground">
            Collaborate with your team, manage projects,
            track performance, organize departments and
            build modern organizations from one platform.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-muted p-6">
        <p className="text-sm leading-7 text-muted-foreground">
          &quot;Built for organizations that care about
          productivity, collaboration and intelligent
          workflow automation.&quot;
        </p>
      </div>
    </motion.aside>
  );
}