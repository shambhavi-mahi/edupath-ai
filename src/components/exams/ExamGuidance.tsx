"use client";

import { useApp } from "@/contexts/AppContext";
import { recommendExams } from "@/lib/utils";
import { EXAMS } from "@/lib/data/exams";
import GlassCard from "@/components/shared/GlassCard";
import Accordion from "@/components/shared/Accordion";
import { BookOpen, Clock, BarChart3 } from "lucide-react";

export default function ExamGuidance() {
  const { profile } = useApp();
  const recommended = profile.stage ? recommendExams(profile) : EXAMS;

  const accordionItems = recommended.map((exam) => ({
    question: `${exam.name} — ${exam.field}`,
    answer: `**Eligibility:** ${exam.eligibility}\n\n**Pattern:** ${exam.pattern}\n\n**Dates:** ${exam.dates}\n\n**Difficulty:** ${exam.difficulty}\n\n**Preparation Timeline:** ${exam.preparationTimeline}\n\n**Recommended Books:** ${exam.books.join(", ")}\n\n**Resources:** ${exam.resources.map((r) => `${r.name} (${r.type})`).join(", ")}`,
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="font-poppins text-3xl font-bold text-text dark:text-white mb-3">
          Entrance Exam Guidance
        </h1>
        <p className="font-inter text-text-muted">
          {profile.stage
            ? `Personalised exam recommendations for your stage`
            : "All major Indian entrance exams with preparation details"}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommended.slice(0, 6).map((exam, i) => (
          <GlassCard key={exam.id} delay={i * 0.05}>
            <h3 className="font-montserrat font-semibold text-text dark:text-white mb-1">
              {exam.name}
            </h3>
            <p className="text-sm text-primary font-dmsans mb-3">{exam.field}</p>
            <div className="space-y-2 text-xs font-inter text-text-muted">
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {exam.dates}
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> {exam.difficulty}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> {exam.preparationTimeline}
              </div>
            </div>
            <span className={`mt-3 inline-block text-xs px-2 py-1 rounded-full font-dmsans ${
              exam.difficulty === "Very Hard" ? "bg-red-100 text-red-700" :
              exam.difficulty === "Hard" ? "bg-orange-100 text-orange-700" :
              exam.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
              "bg-green-100 text-green-700"
            }`}>
              {exam.difficulty}
            </span>
          </GlassCard>
        ))}
      </div>

      <div>
        <h2 className="section-heading">Detailed Exam Guide</h2>
        <Accordion items={accordionItems} />
      </div>
    </div>
  );
}
