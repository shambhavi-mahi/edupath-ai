"use client";

import { useApp } from "@/contexts/AppContext";
import GlassCard from "@/components/shared/GlassCard";
import BrainRadarChart from "@/components/assessment/BrainRadarChart";
import { SCHOLARSHIPS } from "@/lib/data/colleges";
import Link from "next/link";
import { ArrowRight, Save, Share2, Bell } from "lucide-react";

export default function DashboardPage() {
  const { profile, assessmentResult, saveProgress, loadProgress } = useApp();

  const radarData = assessmentResult?.dimensions.map((d) => ({
    dimension: d.name.split(" ")[0],
    score: d.score,
  })) || [];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-poppins text-3xl font-bold text-text dark:text-white">My Dashboard</h1>
        <div className="flex gap-2">
          <button onClick={saveProgress} className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-1">
            <Save className="w-4 h-4" /> Save
          </button>
          <button onClick={loadProgress} className="text-sm font-dmsans text-primary hover:text-secondary px-4 py-2">
            Resume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <h3 className="font-montserrat font-semibold text-text dark:text-white mb-2">Profile</h3>
          <div className="space-y-2 text-sm font-inter text-text-muted">
            <p>Stage: <span className="text-text dark:text-white font-semibold">{profile.stage || "Not set"}</span></p>
            {profile.year && <p>Year: <span className="text-text dark:text-white">{profile.year}</span></p>}
            {profile.budget && <p>Budget: <span className="text-text dark:text-white">{profile.budget}</span></p>}
            {profile.reservationCategory && <p>Category: <span className="text-text dark:text-white">{profile.reservationCategory}</span></p>}
          </div>
          <Link href="/assessment" className="text-sm text-primary font-dmsans mt-4 inline-flex items-center gap-1 hover:text-secondary">
            Update Profile <ArrowRight className="w-3 h-3" />
          </Link>
        </GlassCard>

        <GlassCard>
          <h3 className="font-montserrat font-semibold text-text dark:text-white mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Link href="/assessment" className="block text-sm font-inter text-primary hover:text-secondary">Take Brain Assessment</Link>
            <Link href="/colleges" className="block text-sm font-inter text-primary hover:text-secondary">Find Colleges</Link>
            <Link href="/exams" className="block text-sm font-inter text-primary hover:text-secondary">View Exams</Link>
            <Link href="/careers" className="block text-sm font-inter text-primary hover:text-secondary">Career Planner</Link>
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-montserrat font-semibold text-text dark:text-white mb-2">Share & Export</h3>
          <div className="space-y-3">
            <button
              onClick={() => window.print()}
              className="text-sm font-inter text-primary hover:text-secondary flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" /> Download PDF Report
            </button>
            <button
              onClick={() => {
                const id = Math.random().toString(36).slice(2, 10);
                navigator.clipboard.writeText(`${window.location.origin}/dashboard?share=${id}`);
                alert("Shareable link copied!");
              }}
              className="text-sm font-inter text-primary hover:text-secondary flex items-center gap-1"
            >
              <Share2 className="w-3.5 h-3.5" /> Share Report Link
            </button>
            <p className="text-xs font-inter text-text-muted flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" /> Exam reminders available with account
            </p>
          </div>
        </GlassCard>
      </div>

      {assessmentResult && (
        <GlassCard>
          <h3 className="font-montserrat font-semibold text-lg text-text dark:text-white mb-4">
            Brain Assessment Results
          </h3>
          <p className="text-sm font-inter text-text-muted mb-4">
            Personality: {assessmentResult.personalityType} | Recommended: {assessmentResult.recommendedStream}
          </p>
          {radarData.length > 0 && <BrainRadarChart data={radarData} animated={false} />}
        </GlassCard>
      )}

      <div>
        <h2 className="section-heading">Scholarship Finder</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCHOLARSHIPS.map((s, i) => (
            <GlassCard key={i} delay={i * 0.05}>
              <h4 className="font-montserrat font-semibold text-text dark:text-white">{s.name}</h4>
              <p className="text-sm font-inter text-text-muted mt-1">{s.eligibility}</p>
              <p className="text-sm font-dmsans text-secondary mt-2">{s.amount}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
