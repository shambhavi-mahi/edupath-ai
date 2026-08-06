"use client";

import GlassCard from "@/components/shared/GlassCard";
import BrainRadarChart from "@/components/assessment/BrainRadarChart";

const sampleData = [
  { dimension: "Logical", score: 85 },
  { dimension: "Math", score: 78 },
  { dimension: "Linguistic", score: 72 },
  { dimension: "Musical", score: 55 },
  { dimension: "Creative", score: 80 },
  { dimension: "Interpersonal", score: 68 },
  { dimension: "Intrapersonal", score: 75 },
  { dimension: "Interest", score: 82 },
  { dimension: "Personality", score: 70 },
];

export default function BrainPreview() {
  return (
    <section className="py-20 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="section-heading">Brain Assessment Preview</h2>
            <p className="font-inter text-text-muted mb-6 leading-relaxed">
              Our scientifically structured assessment maps your aptitudes across 9 dimensions.
              See your unique brain profile visualised as an interactive radar chart.
            </p>
            <ul className="space-y-3 font-inter text-sm text-text dark:text-gray-300">
              {["Logical Reasoning & Mathematical Aptitude", "Creative & Musical Intelligence",
                "Interpersonal & Intrapersonal Skills", "Interest & Personality Profiling"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <GlassCard className="!p-4">
            <p className="font-dmsans text-xs text-text-muted text-center mb-2">Sample Brain Map</p>
            <BrainRadarChart data={sampleData} />
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
