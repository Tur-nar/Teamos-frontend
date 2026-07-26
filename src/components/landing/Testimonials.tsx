import { testimonials } from "@/data/testimonials";
import Section from "@/components/layout/section";

export default function Testimonials() {
    return (
        <Section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-8">
                <h2 className="text-3xl font-bold text-center text-foreground py-4">Testimonials</h2>
                <p className="text-lg text-muted-foreground text-center mt-4">What our clients say about us.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-card p-6 rounded-2xl transition-all duration-300 hover:cursor-pointer hover:-translate-y-2 ">
                            <p className="text-foreground mb-4 font-bold text-2xl">&quot;{testimonial.comment}&quot;</p>
                            <p className="fill-rating text-(--rating) text-lg mb-3">
                                 ★★★★★
                            </p>
                            <h3 className="text-2xl font-bold">{testimonial.name}</h3>
                            <p className="text-muted-foreground font-bold">{testimonial.role} | {testimonial.company}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}