import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
    return (
        <section className="w-full py-16">
            <div className="max-w-7xl mx-auto px-8">
                <h2 className="text-3xl font-bold text-center text-cyan-500 py-4">Testimonials</h2>
                <p className="text-lg text-gray-400 text-center mt-4">What our clients say about us.</p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md hover:-translate-y-2 transition-all duration-300">
                            <p className="text-yellow-400 text-lg mb-3">
                                 ★★★★★
                            </p>
                            <p className="text-gray-400 mb-4 font-bold text-2xl">&quot;{testimonial.comment}&quot;</p>
                            <h3 className="text-2xl font-bold">{testimonial.name}</h3>
                            <p className="text-gray-400 font-bold">{testimonial.role} | {testimonial.company}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}