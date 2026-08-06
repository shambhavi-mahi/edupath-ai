"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import GlassCard from "@/components/shared/GlassCard";
import { CareerPath } from "@/types";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

const SAMPLE_PATHS: CareerPath[] = [
  {
    id: "primary",
    title: "Primary Path: Engineering → Software",
    type: "primary",
    steps: [
      { title: "Class 11-12: PCM + JEE Prep", duration: "2 years", description: "Focus on JEE Main & Advanced preparation" },
      { title: "IIT/NIT: Computer Science", duration: "4 years", description: "BTech in CS with strong coding foundation" },
      { title: "Campus Placement / Masters", duration: "0-2 years", description: "SWE role at top tech company or MS abroad" },
    ],
    exams: ["JEE Main", "JEE Advanced"],
  },
  {
    id: "parallel-cds",
    title: "Parallel: CDS Defence Officer",
    type: "parallel",
    steps: [
      { title: "Join NCC in college", duration: "Year 1", description: "Get NCC 'C' certificate for SSB advantage" },
      { title: "CDS written prep", duration: "Year 3-4", description: "Pathfinder CDS + daily GK habit" },
      { title: "SSB Interview", duration: "6 months", description: "Group tasks, OIR, personal interview prep" },
    ],
    exams: ["CDS", "AFCAT"],
  },
  {
    id: "fallback-govt",
    title: "Fallback: Government Exams",
    type: "fallback",
    steps: [
      { title: "SSC CGL / RBI Grade B", duration: "6-12 months", description: "Quant + Reasoning + English + GK" },
      { title: "State PSC Engineering", duration: "Varies", description: "State-specific technical posts" },
      { title: "PSU via GATE", duration: "Final year", description: "ONGC, BHEL, ISRO scientist posts" },
    ],
    exams: ["SSC CGL", "GATE", "State PSC"],
  },
];

export default function CareerPlanner() {
  const { profile } = useApp();
  const [activePath, setActivePath] = useState<string>("primary");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-poppins text-3xl font-bold text-text dark:text-white mb-3">
          Career Path Planner
        </h1>
        <p className="font-inter text-text-muted">
          Primary, parallel, and fallback paths for {profile.stage || "your"} journey
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {SAMPLE_PATHS.map((path) => (
          <button
            key={path.id}
            onClick={() => setActivePath(path.id)}
            className={`px-4 py-2 rounded-button font-dmsans text-sm transition-all ${
              activePath === path.id
                ? path.type === "primary" ? "bg-primary text-white" :
                  path.type === "parallel" ? "bg-secondary text-white" :
                  "bg-orange-500 text-white"
                : "border border-gray-200 dark:border-gray-700 text-text-muted hover:border-primary"
            }`}
          >
            {path.type === "primary" ? "🎯" : path.type === "parallel" ? "🔀" : "🛡️"} {path.title.split(":")[0]}
          </button>
        ))}
      </div>

      {SAMPLE_PATHS.filter((p) => p.id === activePath).map((path) => (
        <motion.div key={path.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard>
            <h2 className="font-montserrat text-xl font-semibold text-text dark:text-white mb-6">
              {path.title}
            </h2>

            <div className="relative">
              {path.steps.map((step, i) => (
                <div key={i} className="flex gap-4 mb-8 last:mb-0">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      path.type === "primary" ? "bg-primary/10 text-primary" :
                      path.type === "parallel" ? "bg-secondary/10 text-secondary" :
                      "bg-orange-100 text-orange-600"
                    }`}>
                      {i < path.steps.length - 1 ? <Circle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    </div>
                    {i < path.steps.length - 1 && (
                      <div className={`w-0.5 flex-1 min-h-[40px] ${
                        path.type === "primary" ? "bg-primary/20" :
                        path.type === "parallel" ? "bg-secondary/20" : "bg-orange-200"
                      }`} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-montserrat font-semibold text-text dark:text-white">
                        {step.title}
                      </h3>
                      <span className="text-xs font-dmsans px-2 py-0.5 rounded-full bg-card dark:bg-background-dark text-text-muted">
                        {step.duration}
                      </span>
                    </div>
                    <p className="font-inter text-sm text-text-muted">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {path.exams && (
              <div className="mt-4 pt-4 border-t border-primary/10">
                <p className="font-dmsans text-sm text-text-muted mb-2">Related Exams:</p>
                <div className="flex flex-wrap gap-2">
                  {path.exams.map((exam) => (
                    <span key={exam} className="indigo-pill text-xs">{exam}</span>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      ))}

      <GlassCard className="text-center">
        <p className="font-inter text-text-muted mb-4">
          Want a personalised roadmap based on your profile?
        </p>
        <a href="/assessment" className="btn-primary inline-flex items-center gap-2">
          Build My Roadmap <ArrowRight className="w-4 h-4" />
        </a>
      </GlassCard>
    </div>
  );
}
