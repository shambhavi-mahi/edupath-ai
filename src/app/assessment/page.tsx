"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import StageSelection from "@/components/assessment/StageSelection";
import BrainAssessment from "@/components/assessment/BrainAssessment";
import { UserStage } from "@/types";

function AssessmentContent() {
  const { profile, setStage } = useApp();
  const searchParams = useSearchParams();
  const [flowStep, setFlowStep] = useState<"stage" | "assessment">("stage");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stageParam = searchParams.get("stage") as UserStage | null;
    if (stageParam) {
      setStage(stageParam);
      setFlowStep("assessment");
    } else if (profile.stage) {
      setFlowStep("assessment");
    }
    setInitialized(true);
  }, [searchParams, profile.stage, setStage]);

  const handleStageSelect = (stage: UserStage, year?: number) => {
    setStage(stage, year);
    if (stage === "class-9-10" || stage === "class-11-12") {
      setFlowStep("assessment");
    } else if (stage === "job-seeker" || stage === "career-switcher") {
      window.location.href = "/careers";
    } else if (stage === "undergraduate" || stage === "postgraduate") {
      window.location.href = "/colleges";
    } else {
      setFlowStep("assessment");
    }
  };

  if (!initialized) {
    return <div className="py-20 text-center font-inter text-text-muted">Loading...</div>;
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      {flowStep === "stage" && <StageSelection onSelect={handleStageSelect} />}
      {flowStep === "assessment" && <BrainAssessment />}
    </div>
  );
}

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center font-inter text-text-muted">Loading...</div>}>
      <AssessmentContent />
    </Suspense>
  );
}
