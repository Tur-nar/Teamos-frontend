import { features } from "@/data/features";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Section from "@/components/layout/section";
import Reveal from "@/components/common/Reveal";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Features() {
  return (
    <Section id="features" className="py-20 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Built for modern teams
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Everything your team needs to move faster.
        </h2>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          From planning to delivery, each workspace component is designed to keep clarity, momentum, and collaboration in one place.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, id) => (
          <Reveal key={feature.title} delay={id * 70}>
            <Card className="group h-full border-border/70 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_20px_50px_rgba(34,211,238,0.12)]">
              <CardHeader className="h-full p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Sparkles className="h-5 w-5" />
                </div>
                <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </CardDescription>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </CardHeader>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}