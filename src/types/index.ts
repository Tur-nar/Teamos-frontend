export interface Feature {
    title: string;
    description: string;
}
export interface Testimonial {
    name: string;
    role: string;
    company: string;
    comment: string;
}

export interface HowItWorks {
    step: number;
    title: string;
    description: string;
}
/**
 * The registry. Adding a new page means adding one line here —
 * that single line controls both what the middleware intercepts
 * AND how it's treated. Nothing to forget in a second place.
 */