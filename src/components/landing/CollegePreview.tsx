"use client";

import GlassCard from "@/components/shared/GlassCard";
import { COLLEGES } from "@/lib/data/colleges";
import { formatCurrency } from "@/lib/utils";
import { MapPin, Shield } from "lucide-react";

export default function CollegePreview() {
  const preview = COLLEGES.slice(0, 3);

  return (
    <section className="py-20 bg-card dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mx-auto">College Recommendations</h2>
        <p className="text-center text-text-muted font-inter mb-12">
          Matched to your rank, budget, and preferences
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((college, i) => (
            <GlassCard key={college.id} delay={i * 0.1}>
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-montserrat font-semibold text-text dark:text-white">
                  {college.name}
                </h3>
                <span className="text-xs font-dmsans px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {college.type}
                </span>
              </div>
              <div className="flex items-center gap-1 text-text-muted text-sm mb-3">
                <MapPin className="w-4 h-4" /> {college.location}, {college.state}
              </div>
              <div className="space-y-2 text-sm font-inter">
                <div className="flex justify-between">
                  <span className="text-text-muted">Fees/year</span>
                  <span className="font-semibold text-text dark:text-white">{formatCurrency(college.feesPerYear)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Avg Package</span>
                  <span className="font-semibold text-secondary">{formatCurrency(college.avgPackage)}</span>
                </div>
              </div>
              {college.nccUnit && (
                <div className="mt-3">
                  <span className="emerald-badge">
                    <Shield className="w-3 h-3 mr-1" /> NCC Unit
                  </span>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
