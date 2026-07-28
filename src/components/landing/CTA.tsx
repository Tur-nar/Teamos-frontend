"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/section";
import Reveal from "@/components/common/Reveal";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <Section>
      <Reveal delay={120}>
        <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(15,23,42,0.04))] px-8 py-16 text-center">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,--primary,transparent_70%)]"
            animate={{ opacity: [0.45, 0.75, 0.45], scale: [0.98, 1.04, 0.98] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-foreground">Ready to build a more productive team?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Create your organization, invite your team, manage projects, track progress, and collaborate from one modern workspace.
            </p>
            <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center justify-center gap-4 md:flex-row">
              <motion.button
                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 18px 44px rgba(34,211,238,0.22)" }}
                className="inline-flex items-center rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground"
              >
                Create Workspace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                className="inline-flex items-center rounded-lg border border-primary/30 bg-background/70 px-6 py-3 font-semibold text-foreground"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}