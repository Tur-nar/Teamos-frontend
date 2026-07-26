import { features } from "@/data/features";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Section from "@/components/layout/section";

export default function Features() {
  return (
    <Section>
        <h2 className="text-3xl font-bold text-center mb-12 text-text-primary py-4">
          Features
        </h2>

        <p className="text-muted-foreground text-center mb-12">
          Discover the powerful features that make our platform the perfect
          solution for your team.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 --card">
          {features.map((feature, id) => (
            <Card key={id}>
              <CardHeader>
                <CardTitle>{feature.title}</CardTitle>

                <CardDescription>
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
    </Section>
  );
}