"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import Section from "@/components/layout/section";
import Reveal from "@/components/common/Reveal";

export default function Testimonials() {
  return (
    <Section className="w-full py-16">
      <div className="mx-auto max-w-7xl px-8">
        <Reveal className="text-center">
          <h2 className="py-4 text-3xl font-bold text-foreground">Testimonials</h2>
          <p className="mt-4 text-lg text-muted-foreground">What our clients say about us.</p>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 180}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01, boxShadow: "0 24px 60px rgba(34, 211, 238, 0.14)" }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border/70 bg-card/80 p-6"
              >
                <p className="mb-4 text-2xl font-bold text-foreground">&quot;{testimonial.comment}&quot;</p>
                <div className="flex items-center gap-0.5 text-(--rating)">
                  {[...Array(5)].map((_, i) => (
                    <motion.span key={i} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.03 }}>
                      ★
                    </motion.span>
                  ))}
                </div>
                <h3 className="mt-4 text-2xl font-bold">{testimonial.name}</h3>
                <p className="font-bold text-muted-foreground">
                  {testimonial.role} | {testimonial.company}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}