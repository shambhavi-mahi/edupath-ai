"use client";

import { EXAM_MARQUEE } from "@/lib/data/exams";

export default function ExamMarquee() {
  const items = [...EXAM_MARQUEE, ...EXAM_MARQUEE];

  return (
    <section className="py-16 bg-white dark:bg-background-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <h2 className="section-heading text-center mx-auto">Exam Coverage</h2>
        <p className="text-center text-text-muted font-inter">
          Supporting all major Indian entrance exams
        </p>
      </div>
      <div className="relative">
        <div className="flex animate-marquee gap-4 w-max">
          {items.map((exam, i) => (
            <span key={i} className="indigo-pill text-base px-5 py-2.5">
              {exam}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
