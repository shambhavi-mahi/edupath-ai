"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { recommendColleges, formatCurrency } from "@/lib/utils";
import { College, BudgetRange, ReservationCategory } from "@/types";
import GlassCard from "@/components/shared/GlassCard";
import { MapPin, Shield, Star, GitCompare, ChevronDown } from "lucide-react";

const BUDGET_OPTIONS: { value: BudgetRange; label: string }[] = [
  { value: "under-2L", label: "Under ₹2L/year" },
  { value: "2-5L", label: "₹2–5L/year" },
  { value: "5-10L", label: "₹5–10L/year" },
  { value: "10-20L", label: "₹10–20L/year" },
  { value: "20L-plus", label: "₹20L+/year" },
  { value: "scholarship", label: "Scholarship dependent" },
];

const PREFERENCE_OPTIONS = [
  "NCC unit on campus",
  "Strong placement record",
  "Strong research culture",
  "Hostel availability",
  "Proximity to home state",
  "South India location",
  "Sports & cultural facilities",
  "Prepare for CDS/defence alongside college",
  "Scholarship availability",
];

const CATEGORIES: ReservationCategory[] = ["General", "OBC", "SC", "ST", "EWS"];

export default function CollegeEngine() {
  const { profile, updateProfile } = useApp();
  const [step, setStep] = useState(0);
  const [rank, setRank] = useState("");
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>(profile.preferences || []);
  const [customPref, setCustomPref] = useState("");
  const [results, setResults] = useState<College[]>([]);
  const [compareList, setCompareList] = useState<string[]>([]);

  const togglePref = (pref: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const runSearch = () => {
    const updatedProfile = {
      ...profile,
      preferences: [...selectedPrefs, customPref].filter(Boolean),
      examScores: { jee: rank },
    };
    updateProfile(updatedProfile);
    setResults(recommendColleges(updatedProfile));
    setStep(3);
  };

  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const compareColleges = results.filter((c) => compareList.includes(c.id));

  if (step === 3) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <h2 className="section-heading">Your College Matches</h2>
        <p className="font-inter text-text-muted">
          {results.length} colleges matched to your profile. Select up to 3 to compare.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((college, i) => (
            <GlassCard key={college.id} delay={i * 0.05}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-poppins font-bold text-primary">#{i + 1}</span>
                    <h3 className="font-montserrat font-semibold text-text dark:text-white">
                      {college.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1 text-text-muted text-sm mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {college.location}, {college.state}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-secondary" />
                  <span className="font-dmsans text-sm font-semibold text-secondary">
                    {college.matchScore}%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm font-inter mb-3">
                <div>
                  <span className="text-text-muted">Fees/yr</span>
                  <p className="font-semibold text-text dark:text-white">{formatCurrency(college.feesPerYear)}</p>
                </div>
                <div>
                  <span className="text-text-muted">Avg Package</span>
                  <p className="font-semibold text-secondary">{formatCurrency(college.avgPackage)}</p>
                </div>
                <div>
                  <span className="text-text-muted">Highest Pkg</span>
                  <p className="font-semibold">{formatCurrency(college.highestPackage)}</p>
                </div>
                <div>
                  <span className="text-text-muted">Type</span>
                  <p className="font-semibold">{college.type}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {college.nccUnit && (
                  <span className="emerald-badge"><Shield className="w-3 h-3 mr-1" /> NCC</span>
                )}
                {college.exams.map((e) => (
                  <span key={e} className="indigo-pill text-xs">{e}</span>
                ))}
              </div>

              <p className="text-sm font-inter text-text-muted mb-3">{college.matchReason}</p>

              <button
                onClick={() => toggleCompare(college.id)}
                className={`text-xs font-dmsans px-3 py-1.5 rounded-button border transition-colors ${
                  compareList.includes(college.id)
                    ? "bg-primary text-white border-primary"
                    : "border-primary/20 text-primary hover:bg-primary/10"
                }`}
              >
                <GitCompare className="w-3 h-3 inline mr-1" />
                {compareList.includes(college.id) ? "Comparing" : "Compare"}
              </button>
            </GlassCard>
          ))}
        </div>

        {compareColleges.length >= 2 && (
          <GlassCard>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Side-by-Side Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-inter">
                <thead>
                  <tr className="border-b border-primary/10">
                    <th className="text-left py-2 text-text-muted">Factor</th>
                    {compareColleges.map((c) => (
                      <th key={c.id} className="text-left py-2 px-3 text-text dark:text-white font-montserrat">
                        {c.name.split(" ")[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-primary/5">
                    <td className="py-2 text-text-muted">Fees/year</td>
                    {compareColleges.map((c) => (
                      <td key={c.id} className="py-2 px-3 text-text dark:text-gray-300">{formatCurrency(c.feesPerYear)}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-primary/5">
                    <td className="py-2 text-text-muted">Avg Package</td>
                    {compareColleges.map((c) => (
                      <td key={c.id} className="py-2 px-3 text-text dark:text-gray-300">{formatCurrency(c.avgPackage)}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-primary/5">
                    <td className="py-2 text-text-muted">NCC Unit</td>
                    {compareColleges.map((c) => (
                      <td key={c.id} className="py-2 px-3 text-text dark:text-gray-300">{c.nccUnit ? "Yes ✓" : "No"}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-primary/5">
                    <td className="py-2 text-text-muted">Type</td>
                    {compareColleges.map((c) => (
                      <td key={c.id} className="py-2 px-3 text-text dark:text-gray-300">{c.type}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-primary/5">
                    <td className="py-2 text-text-muted">Research</td>
                    {compareColleges.map((c) => (
                      <td key={c.id} className="py-2 px-3 text-text dark:text-gray-300">{c.researchCulture}</td>
                    ))}
                  </tr>
                  <tr className="border-b border-primary/5">
                    <td className="py-2 text-text-muted">Match Score</td>
                    {compareColleges.map((c) => (
                      <td key={c.id} className="py-2 px-3 text-text dark:text-gray-300">{c.matchScore}%</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </GlassCard>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {step === 0 && (
          <GlassCard>
            <h2 className="font-montserrat text-xl font-semibold text-text dark:text-white mb-4">
              What is your exam rank/score?
            </h2>
            <input
              type="text"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="e.g., JEE Rank 15000, CAT 85 percentile, NEET 450 marks"
              className="input-field mb-4"
            />
            <button onClick={() => setStep(1)} disabled={!rank} className="btn-primary w-full disabled:opacity-50">
              Next <ChevronDown className="w-4 h-4 inline rotate-[-90deg]" />
            </button>
          </GlassCard>
        )}

        {step === 1 && (
          <GlassCard>
            <h2 className="font-montserrat text-xl font-semibold text-text dark:text-white mb-4">
              What is your total budget for college?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {BUDGET_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { updateProfile({ budget: opt.value }); setStep(2); }}
                  className={`p-4 rounded-button border text-left font-inter text-sm transition-all hover:border-primary hover:bg-primary/5 ${
                    profile.budget === opt.value ? "border-primary bg-primary/10" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(0)} className="text-sm text-text-muted hover:text-primary font-dmsans">
              ← Back
            </button>
          </GlassCard>
        )}

        {step === 2 && (
          <GlassCard>
            <h2 className="font-montserrat text-xl font-semibold text-text dark:text-white mb-2">
              Special Preferences
            </h2>
            <p className="text-sm text-text-muted font-inter mb-4">Select all that apply</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {PREFERENCE_OPTIONS.map((pref) => (
                <button
                  key={pref}
                  onClick={() => togglePref(pref)}
                  className={`text-xs px-3 py-2 rounded-full border font-dmsans transition-colors ${
                    selectedPrefs.includes(pref)
                      ? "bg-secondary/10 border-secondary text-secondary"
                      : "border-gray-200 dark:border-gray-700 text-text-muted hover:border-primary"
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={customPref}
              onChange={(e) => setCustomPref(e.target.value)}
              placeholder="Other preferences (e.g., placement in Google, women's college)"
              className="input-field mb-4"
            />

            <h3 className="font-montserrat text-sm font-semibold text-text dark:text-white mb-2">
              Reservation Category
            </h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateProfile({ reservationCategory: cat })}
                  className={`text-xs px-3 py-2 rounded-full border font-dmsans transition-colors ${
                    profile.reservationCategory === cat
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-gray-200 dark:border-gray-700 text-text-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button onClick={runSearch} className="btn-primary w-full">
              Find My Colleges
            </button>
            <button onClick={() => setStep(1)} className="mt-3 text-sm text-text-muted hover:text-primary font-dmsans block mx-auto">
              ← Back
            </button>
          </GlassCard>
        )}
      </motion.div>
    </div>
  );
}
