"use client";

import GlassCard from "@/components/shared/GlassCard";
import { UserCheck, Brain, Target, Rocket } from "lucide-react";

const steps = [
  { icon: UserCheck, title: "Select Your Stage", desc: "Tell us where you are — Class 10, 12, college, or working professional." },
  { icon: Brain, title: "Brain Assessment", desc: "Take our 9-dimension aptitude test covering logic, creativity, personality & more." },
  { icon: Target, title: "Get Recommendations", desc: "Receive personalised stream, exam, and college recommendations powered by AI." },
  { icon: Rocket, title: "Plan Your Future", desc: "Build parallel career paths, compare options, and download your PDF report." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mx-auto">How It Works</h2>
        <p className="text-center text-text-muted font-inter mb-12 max-w-2xl mx-auto">
          Four simple steps from confusion to clarity
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <GlassCard key={i} delay={i * 0.1} className="text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-white font-poppins font-bold text-sm flex items-center justify-center">
                {i + 1}
              </div>
              <div className="w-14 h-14 mx-auto mt-4 mb-4 rounded-card bg-primary/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-text dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-text-muted leading-relaxed">{step.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
