import Features from "@/components/landing/Features";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </PageTransition>
  );
}