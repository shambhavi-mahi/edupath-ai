"use client";

import GlassCard from "@/components/shared/GlassCard";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", stage: "Class 10 Student, Delhi", quote: "EduPath AI helped me choose PCM over Commerce. The brain assessment showed my logical reasoning was 85% — now I'm preparing for JEE with confidence!" },
  { name: "Arjun Reddy", stage: "BTech 3rd Year, Hyderabad", quote: "I wanted NCC + good placements under ₹3L in South India. EduPath gave me a perfect list with NIT Trichy and Anna University. Preparing for CDS alongside!" },
  { name: "Sneha Patel", stage: "BCom Graduate, Mumbai", quote: "As a fresh graduate with no experience, I was lost. PathBot guided me to banking exams and helped me land an Accounts Executive role in 3 months." },
  { name: "Rahul Mehta", stage: "Software Engineer, Bangalore", quote: "Switching from SWE to Product Management felt impossible. EduPath's transition roadmap and skill recommendations got me an APM role at a startup!" },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mx-auto">Student Stories</h2>
        <p className="text-center text-text-muted font-inter mb-12">
          Real students, real transformations
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <GlassCard key={i} delay={i * 0.1} className="relative">
              <Quote className="w-8 h-8 text-secondary/30 absolute top-4 right-4" />
              <p className="font-inter text-text dark:text-gray-300 leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="border-t border-primary-light/20 pt-4">
                <p className="font-montserrat font-semibold text-text dark:text-white">{t.name}</p>
                <p className="font-inter text-sm text-text-muted">{t.stage}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
