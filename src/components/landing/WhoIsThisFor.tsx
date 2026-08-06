"use client";

import Link from "next/link";
import GlassCard from "@/components/shared/GlassCard";
import { BookOpen, FlaskConical, University, Briefcase, Search, RefreshCw } from "lucide-react";

const stages = [
  { icon: BookOpen, title: "Class 9–10", desc: "Pre-stream selection guidance", href: "/assessment?stage=class-9-10" },
  { icon: FlaskConical, title: "Class 11–12", desc: "Entrance exam preparation", href: "/assessment?stage=class-11-12" },
  { icon: University, title: "Undergraduate", desc: "College & parallel career paths", href: "/assessment?stage=undergraduate" },
  { icon: University, title: "Postgraduate", desc: "CAT, GATE, UPSC & higher studies", href: "/assessment?stage=postgraduate" },
  { icon: Search, title: "Job Seeker", desc: "Fresh graduate job matching", href: "/assessment?stage=job-seeker" },
  { icon: RefreshCw, title: "Career Switcher", desc: "Transition roadmap & upskilling", href: "/assessment?stage=career-switcher" },
];

export default function WhoIsThisFor() {
  return (
    <section className="py-20 bg-card dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mx-auto">Who Is This For?</h2>
        <p className="text-center text-text-muted font-inter mb-12">
          Personalised flows for every stage of your journey
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage, i) => (
            <Link key={i} href={stage.href}>
              <GlassCard delay={i * 0.08} className="cursor-pointer h-full">
                <div className="w-12 h-12 rounded-card bg-primary-light/30 flex items-center justify-center mb-4">
                  <stage.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-montserrat font-semibold text-lg text-text dark:text-white mb-1">
                  {stage.title}
                </h3>
                <p className="font-inter text-sm text-text-muted">{stage.desc}</p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
