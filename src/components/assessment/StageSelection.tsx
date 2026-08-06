"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserStage } from "@/types";
import { useApp } from "@/contexts/AppContext";
import GlassCard from "@/components/shared/GlassCard";
import {
  BookOpen, FlaskConical, University, Briefcase, Search, RefreshCw, ChevronRight,
} from "lucide-react";

const stages: { id: UserStage; icon: typeof BookOpen; title: string; desc: string }[] = [
  { id: "class-9-10", icon: BookOpen, title: "Class 9–10", desc: "Pre-stream selection — let's find your ideal stream" },
  { id: "class-11-12", icon: FlaskConical, title: "Class 11–12", desc: "Stream chosen — plan your entrance exams" },
  { id: "undergraduate", icon: University, title: "Undergraduate Student", desc: "In college — explore parallel career paths" },
  { id: "postgraduate", icon: University, title: "Postgraduate Student", desc: "Higher studies and specialisation guidance" },
  { id: "job-seeker", icon: Search, title: "Recently Completed Studies", desc: "Searching for your first job" },
  { id: "career-switcher", icon: RefreshCw, title: "Working Professional", desc: "Looking to switch your career" },
];

interface StageSelectionProps {
  onSelect: (stage: UserStage, year?: number) => void;
}

export default function StageSelection({ onSelect }: StageSelectionProps) {
  const { profile } = useApp();
  const [showYearSelect, setShowYearSelect] = useState(false);
  const [selectedStage, setSelectedStage] = useState<UserStage | null>(null);

  const handleStageClick = (stage: UserStage) => {
    if (stage === "undergraduate") {
      setSelectedStage(stage);
      setShowYearSelect(true);
    } else {
      onSelect(stage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-poppins text-3xl md:text-4xl font-bold text-text dark:text-white mb-3">
          Where Are You in Your Journey?
        </h1>
        <p className="font-inter text-text-muted">
          Select your current stage to unlock a personalised experience
        </p>
      </motion.div>

      {showYearSelect ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <h2 className="font-montserrat text-xl font-semibold text-text dark:text-white mb-6">
            Which year are you in?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[1, 2, 3, 4].map((year) => (
              <button
                key={year}
                onClick={() => onSelect("undergraduate", year)}
                className="w-20 h-20 rounded-card bg-primary/10 hover:bg-primary hover:text-white text-primary font-poppins font-bold text-xl transition-all hover:scale-105"
              >
                {year}
                <span className="block text-xs font-inter font-normal">Year</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowYearSelect(false)}
            className="mt-6 text-sm text-text-muted hover:text-primary font-dmsans"
          >
            ← Back to stages
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {stages.map((stage, i) => (
            <GlassCard
              key={stage.id}
              delay={i * 0.08}
              className={`cursor-pointer group ${profile.stage === stage.id ? "ring-2 ring-secondary" : ""}`}
              hover
            >
              <button
                onClick={() => handleStageClick(stage.id)}
                className="w-full text-left flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-card bg-primary-light/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <stage.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-montserrat font-semibold text-text dark:text-white">
                    {stage.title}
                  </h3>
                  <p className="font-inter text-sm text-text-muted">{stage.desc}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              </button>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
