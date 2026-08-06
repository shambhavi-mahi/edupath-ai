"use client";

import GlassCard from "@/components/shared/GlassCard";
import { Brain, GraduationCap, Building2, Briefcase, GitBranch, FileText } from "lucide-react";

const features = [
  { icon: Brain, title: "Brain Power Assessment", desc: "9-dimension radar chart covering logic, maths, creativity, personality & more." },
  { icon: GraduationCap, title: "Stream Guidance", desc: "PCM, PCB, Commerce, Arts — data-driven recommendations after Class 10." },
  { icon: Building2, title: "College Finder", desc: "Ranked colleges by budget, NCC, placements, location & your exam scores." },
  { icon: Briefcase, title: "Job & Career Switch", desc: "Role recommendations, upskill roadmaps, and realistic salary expectations." },
  { icon: GitBranch, title: "Parallel Path Planning", desc: "Primary, parallel & fallback career paths with semester-wise timelines." },
  { icon: FileText, title: "PDF Reports", desc: "Download branded career reports to share with parents and counsellors." },
];

export default function FeaturesGrid() {
  return (
    <section className="py-20 bg-card dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mx-auto">Powerful Features</h2>
        <p className="text-center text-text-muted font-inter mb-12 max-w-2xl mx-auto">
          Everything you need for your education and career journey
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <GlassCard key={i} delay={i * 0.08}>
              <div className="w-12 h-12 rounded-button bg-secondary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-montserrat font-semibold text-lg text-text dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="font-inter text-sm text-text-muted leading-relaxed">{feature.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
