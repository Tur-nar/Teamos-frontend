import { features } from "@/data/features";
import Card from "@/components/ui/Card";

export default function Features() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-cyan-500 py-4">Features</h2>
                <p className="text-gray-300 text-center mb-12">
                    Discover the powerful features that make our platform the perfect solution for your team.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, id) => (
                        <Card key={id} title={feature.title} description={feature.description} />
                    ))}
                </div>
            </div>
        </section>
    );
}