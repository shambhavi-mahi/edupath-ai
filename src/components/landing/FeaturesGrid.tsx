"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Brain, GraduationCap, Building2, Briefcase, GitBranch, FileText } from "lucide-react";
import { FadeUp, FlipCard, MorphingGradientBg, LineDrawReveal, Magnetic } from "@/components/shared/DoraAnimations";

const features = [
  { icon: Brain,         title: "Brain Power Assessment", desc: "9-dimension radar chart covering logic, maths, creativity & personality.", color:"card-lavender", iconBg:"bg-primary-subtle",   iconColor:"text-primary",   emoji:"🧠" },
  { icon: GraduationCap, title: "Stream Guidance",        desc: "PCM, PCB, Commerce, Arts — data-driven recommendations after Class 10.",   color:"card-mint",    iconBg:"bg-secondary-subtle", iconColor:"text-secondary-dark", emoji:"🎓" },
  { icon: Building2,     title: "College Finder",          desc: "Ranked colleges by budget, NCC, placements, location & exam scores.",       color:"card-orange",  iconBg:"bg-accent-orange-bg",iconColor:"text-amber-600",  emoji:"🏛️" },
  { icon: Briefcase,     title: "Job & Career Switch",     desc: "Role recommendations, upskill roadmaps & realistic salary expectations.",    color:"card-pink",    iconBg:"bg-accent-pink-bg",  iconColor:"text-rose-500",   emoji:"💼" },
  { icon: GitBranch,     title: "Parallel Path Planning",  desc: "Primary, parallel & fallback career paths with semester-wise timelines.",    color:"card-sky",     iconBg:"bg-accent-sky-bg",   iconColor:"text-blue-500",   emoji:"🗺️" },
  { icon: FileText,      title: "PDF Reports",             desc: "Download branded career reports to share with parents & counsellors.",       color:"card-peach",   iconBg:"bg-accent-peach-bg", iconColor:"text-red-400",    emoji:"📄" },
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      <MorphingGradientBg />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <FadeUp delay={0}>
            <span className="badge badge-primary mb-4 inline-block">What we offer</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-text mb-3 leading-tight">
              Powerful Features
            </h2>
          </FadeUp>
          <LineDrawReveal className="w-48 mx-auto mb-4" delay={0.3} />
          <FadeUp delay={0.2}>
            <p className="text-text-muted font-inter max-w-xl mx-auto">
              Everything you need for your education and career journey — in one place
            </p>
          </FadeUp>
        </div>

        {/* Cards — 3D FlipCard entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FlipCard key={i} delay={i * 0.08} className={`${f.color} rounded-card border p-6 group cursor-pointer`}>
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 ${f.iconBg} rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <f.icon className={`w-6 h-6 ${f.iconColor}`} />
                </div>
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm group-hover:rotate-45">
                  <ArrowUpRight className="w-4 h-4 text-text" />
                </div>
              </div>
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="font-poppins font-bold text-text text-lg mb-2">{f.title}</h3>
              <p className="font-inter text-sm text-text-muted leading-relaxed">{f.desc}</p>
            </FlipCard>
          ))}
        </div>

        {/* Magnetic CTA */}
        <div className="text-center mt-12">
          <FadeUp delay={0.3}>
            <Magnetic strength={0.3}>
              <Link href="/assessment" className="btn-primary inline-flex items-center gap-2">
                Explore All Features <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Magnetic>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
