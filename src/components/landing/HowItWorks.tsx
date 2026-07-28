"use client";

import { motion } from "framer-motion";
import { howItWorks } from "@/data/howItWorks";
import Section from "@/components/layout/section";
import Reveal from "@/components/common/Reveal";

export default function HowItWorks() {
  return (
    <Section id="how-it-works" className="w-full py-16">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal className="text-center">
          <h2 className="py-4 text-3xl font-bold text-foreground">How It Works</h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Everything you need to organize, collaborate and deliver projects successfully.
          </p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, id) => (
            <Reveal key={step.title} delay={id * 190}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center rounded-2xl border border-border/70 bg-card/70 p-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground"
                >
                  {step.step}
                </motion.div>
                <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}