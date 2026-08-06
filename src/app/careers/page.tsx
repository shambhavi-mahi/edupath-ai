"use client";

import { useState } from "react";
import CareerPlanner from "@/components/careers/CareerPlanner";
import JobRecommendation from "@/components/careers/JobRecommendation";

export default function CareersPage() {
  const [tab, setTab] = useState<"planner" | "jobs">("planner");

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setTab("planner")}
          className={`px-6 py-2 rounded-button font-dmsans text-sm transition-all ${
            tab === "planner" ? "bg-primary text-white" : "border border-gray-200 text-text-muted"
          }`}
        >
          Career Path Planner
        </button>
        <button
          onClick={() => setTab("jobs")}
          className={`px-6 py-2 rounded-button font-dmsans text-sm transition-all ${
            tab === "jobs" ? "bg-primary text-white" : "border border-gray-200 text-text-muted"
          }`}
        >
          Job & Role Finder
        </button>
      </div>
      {tab === "planner" ? <CareerPlanner /> : <JobRecommendation />}
    </div>
  );
}
