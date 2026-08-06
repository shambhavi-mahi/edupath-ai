"use client";

import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { ASSESSMENT_QUESTIONS } from "@/lib/data/assessmentQuestions";
import {
  calculateDimensionScoresSync,
  getPersonalityType,
  recommendStream,
} from "@/lib/utils";
import ProgressBar from "@/components/shared/ProgressBar";
import BrainRadarChart from "./BrainRadarChart";
import GlassCard from "@/components/shared/GlassCard";
import { Check, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { Stream } from "@/types";

export default function BrainAssessment() {
  const {
    assessmentProgress,
    assessmentStep,
    setAssessmentAnswer,
    setAssessmentStep,
    setAssessmentResult,
    assessmentResult,
    saveProgress,
    profile,
  } = useApp();

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[assessmentStep];
  const progress = (Object.keys(assessmentProgress).length / totalQuestions) * 100;
  const isComplete = assessmentStep >= totalQuestions;

  const handleAnswer = (score: number) => {
    setAssessmentAnswer(currentQ.id, score);
    if (assessmentStep + 1 >= totalQuestions) {
      const allAnswers = { ...assessmentProgress, [currentQ.id]: score };
      const dimensions = calculateDimensionScoresSync(allAnswers, ASSESSMENT_QUESTIONS);
      const personalityType = getPersonalityType(dimensions);
      const streamRec = recommendStream({
        dimensions,
        personalityType,
        recommendedStream: "PCM" as Stream,
        streamReasons: [],
        completedAt: new Date().toISOString(),
      });

      setAssessmentResult({
        dimensions,
        personalityType,
        recommendedStream: streamRec.stream,
        streamReasons: streamRec.reasons,
        completedAt: new Date().toISOString(),
      });
      saveProgress();
    }
    setAssessmentStep(assessmentStep + 1);
  };

  if (isComplete && assessmentResult) {
    const radarData = assessmentResult.dimensions.map((d) => ({
      dimension: d.name.split(" ")[0],
      score: d.score,
    }));

    const streams: { name: Stream; match: boolean }[] = [
      { name: "PCM", match: assessmentResult.recommendedStream === "PCM" },
      { name: "PCB", match: assessmentResult.recommendedStream === "PCB" },
      { name: "PCMB", match: assessmentResult.recommendedStream === "PCMB" },
      { name: "Commerce-Maths", match: assessmentResult.recommendedStream === "Commerce-Maths" },
      { name: "Arts", match: assessmentResult.recommendedStream === "Arts" },
      { name: "Vocational", match: assessmentResult.recommendedStream === "Vocational" },
    ];

    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h2 className="font-poppins text-3xl font-bold text-text dark:text-white mb-2">
            Your Brain Profile
          </h2>
          <p className="font-inter text-text-muted">
            Personality: <span className="text-primary font-semibold">{assessmentResult.personalityType}</span>
          </p>
        </motion.div>

        <GlassCard>
          <BrainRadarChart data={radarData} />
        </GlassCard>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {assessmentResult.dimensions.map((d) => (
            <div key={d.name} className="glass-card p-4 text-center">
              <p className="font-dmsans text-xs text-text-muted mb-1">{d.name}</p>
              <p className="font-poppins text-2xl font-bold text-primary">{d.score}%</p>
            </div>
          ))}
        </div>

        {(profile.stage === "class-9-10" || !profile.stage) && (
          <div>
            <h3 className="section-heading">Recommended Stream</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {streams.map((s) => (
                <GlassCard
                  key={s.name}
                  className={s.match ? "border-2 border-primary ring-2 ring-secondary/30" : "opacity-60"}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-montserrat font-semibold text-text dark:text-white">{s.name}</h4>
                    {s.match && <Check className="w-5 h-5 text-secondary" />}
                  </div>
                  {s.match && (
                    <ul className="space-y-1">
                      {assessmentResult.streamReasons.map((r, i) => (
                        <li key={i} className="text-sm font-inter text-text-muted flex items-start gap-1">
                          <span className="text-secondary mt-1">•</span> {r}
                        </li>
                      ))}
                    </ul>
                  )}
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/exams" className="btn-primary inline-flex items-center gap-2">
            View Entrance Exams <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/colleges" className="btn-secondary inline-flex items-center gap-2">
            Find Colleges
          </Link>
          <button
            onClick={() => window.print()}
            className="font-dmsans px-6 py-3 border border-primary/20 rounded-button text-primary hover:bg-primary/10 inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="font-dmsans text-sm text-text-muted">
            Question {assessmentStep + 1} of {totalQuestions}
          </span>
          <span className="font-dmsans text-sm text-primary font-semibold">{currentQ.dimension}</span>
        </div>
        <ProgressBar progress={progress} showPercentage />
      </div>

      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <GlassCard>
          <span className="text-xs font-dmsans px-2 py-1 rounded-full bg-primary/10 text-primary mb-4 inline-block">
            {currentQ.type === "scenario" ? "Scenario" : "MCQ"}
          </span>
          <h3 className="font-montserrat text-lg font-semibold text-text dark:text-white mb-6 leading-relaxed">
            {currentQ.question}
          </h3>
          <div className="space-y-3">
            {currentQ.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left px-4 py-3 rounded-button border border-primary/10 hover:border-primary hover:bg-primary/5 font-inter text-sm text-text dark:text-gray-300 transition-all hover:scale-[1.01]"
              >
                {option.label}
              </button>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
