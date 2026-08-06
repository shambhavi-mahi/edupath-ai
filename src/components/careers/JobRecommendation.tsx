"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import GlassCard from "@/components/shared/GlassCard";
import { JobRole } from "@/types";
import { Briefcase, TrendingUp, Award, ExternalLink } from "lucide-react";

const JOB_DATABASE: Record<string, JobRole[]> = {
  bcom: [
    { title: "Accounts Executive", companies: ["Deloitte", "EY", "TCS", "Wipro"], skills: ["Tally", "GST", "Excel"], certifications: ["Tally ERP", "GST Practitioner"], salaryRange: "₹3-5 LPA", platforms: ["Naukri", "LinkedIn"] },
    { title: "Bank PO", companies: ["SBI", "IBPS Banks", "RBI"], skills: ["Quantitative Aptitude", "Reasoning", "English"], certifications: ["Banking Awareness"], salaryRange: "₹8-12 LPA", platforms: ["IBPS Portal"] },
    { title: "Tax Associate", companies: ["KPMG", "PwC", "Local CA Firms"], skills: ["Income Tax", "TDS", "Audit"], certifications: ["CA Foundation", "CMA Inter"], salaryRange: "₹4-7 LPA", platforms: ["Naukri", "Internshala"] },
  ],
  btech: [
    { title: "Software Engineer", companies: ["Google", "Microsoft", "Amazon", "Flipkart"], skills: ["DSA", "System Design", "React/Node"], certifications: ["AWS", "Google Cloud"], salaryRange: "₹12-25 LPA", platforms: ["LinkedIn", "Instahyre"] },
    { title: "Data Analyst", companies: ["Swiggy", "Razorpay", "Mu Sigma"], skills: ["SQL", "Python", "Tableau"], certifications: ["Google Data Analytics"], salaryRange: "₹6-12 LPA", platforms: ["LinkedIn", "Naukri"] },
    { title: "Product Manager", companies: ["Flipkart", "PhonePe", "Zomato"], skills: ["PRD Writing", "User Research", "Analytics"], certifications: ["Product School"], salaryRange: "₹20-40 LPA", platforms: ["LinkedIn", "Cutshort"] },
  ],
  career_switch: [
    { title: "Associate Product Manager", companies: ["Startups", "Razorpay", "Meesho"], skills: ["Product Sense", "SQL", "Wireframing"], certifications: ["Reforge", "Product School"], salaryRange: "₹18-30 LPA", platforms: ["LinkedIn", "Cutshort"] },
    { title: "Technical Program Manager", companies: ["Google", "Amazon", "Microsoft"], skills: ["Agile", "Stakeholder Mgmt", "Technical Depth"], certifications: ["PMP", "CSM"], salaryRange: "₹25-45 LPA", platforms: ["LinkedIn"] },
    { title: "Solutions Architect", companies: ["AWS", "Azure Partners", "Consulting Firms"], skills: ["Cloud", "System Design", "Pre-sales"], certifications: ["AWS SA", "Azure Architect"], salaryRange: "₹20-35 LPA", platforms: ["LinkedIn", "Naukri"] },
  ],
};

export default function JobRecommendation() {
  const { profile, updateProfile } = useApp();
  const [step, setStep] = useState(0);
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState(0);
  const [skills, setSkills] = useState("");
  const [salary, setSalary] = useState("");
  const [workStyle, setWorkStyle] = useState<"remote" | "hybrid" | "onsite">("hybrid");
  const [results, setResults] = useState<JobRole[]>([]);

  const getRecommendations = () => {
    let jobs: JobRole[] = [];
    if (profile.stage === "career-switcher" || experience >= 2) {
      jobs = JOB_DATABASE.career_switch;
    } else if (qualification.toLowerCase().includes("bcom") || qualification.toLowerCase().includes("commerce")) {
      jobs = JOB_DATABASE.bcom;
    } else {
      jobs = JOB_DATABASE.btech;
    }
    updateProfile({ skills: skills.split(",").map((s) => s.trim()), experience, salaryExpectation: salary, workStyle });
    setResults(jobs);
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="section-heading">Recommended Roles</h2>
        {results.map((job, i) => (
          <GlassCard key={i} delay={i * 0.1}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-button bg-secondary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-montserrat font-semibold text-lg text-text dark:text-white">{job.title}</h3>
                <p className="font-dmsans text-secondary font-semibold">{job.salaryRange}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-inter">
              <div>
                <p className="text-text-muted mb-1 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> Companies Hiring</p>
                <div className="flex flex-wrap gap-1">
                  {job.companies.map((c) => <span key={c} className="indigo-pill text-xs">{c}</span>)}
                </div>
              </div>
              <div>
                <p className="text-text-muted mb-1 flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Skills to Upskill</p>
                <div className="flex flex-wrap gap-1">
                  {job.skills.map((s) => <span key={s} className="emerald-badge text-xs">{s}</span>)}
                </div>
              </div>
              <div>
                <p className="text-text-muted mb-1">Certifications</p>
                <p className="text-text dark:text-gray-300">{job.certifications.join(", ")}</p>
              </div>
              <div>
                <p className="text-text-muted mb-1 flex items-center gap-1"><ExternalLink className="w-3.5 h-3.5" /> Platforms</p>
                <p className="text-text dark:text-gray-300">{job.platforms.join(", ")}</p>
              </div>
            </div>
          </GlassCard>
        ))}

        {profile.stage === "career-switcher" && (
          <GlassCard>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Career Transition Roadmap</h3>
            <div className="space-y-4">
              {[
                { phase: "Months 1-3", task: "Learn product frameworks, start writing PRDs", status: "current" },
                { phase: "Months 4-6", task: "Build portfolio with 2-3 product case studies", status: "upcoming" },
                { phase: "Months 7-9", task: "Network on LinkedIn, apply to APM/Internal PM roles", status: "upcoming" },
                { phase: "Months 10-12", task: "Interview prep, negotiate offer (target ₹25-35 LPA)", status: "upcoming" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-secondary" : "bg-primary/30"}`} />
                  <div>
                    <span className="font-dmsans text-xs text-primary">{item.phase}</span>
                    <p className="font-inter text-sm text-text dark:text-gray-300">{item.task}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    );
  }

  const steps = [
    { title: "Your Qualification", content: (
      <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} placeholder="e.g., BCom, BTech CSE, MBA" className="input-field" />
    )},
    { title: "Work Experience (years)", content: (
      <input type="number" value={experience} onChange={(e) => setExperience(Number(e.target.value))} min={0} max={30} className="input-field" />
    )},
    { title: "Your Skills", content: (
      <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Python, Excel, Communication (comma separated)" className="input-field" />
    )},
    { title: "Salary Expectation & Work Style", content: (
      <div className="space-y-4">
        <input type="text" value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="e.g., ₹8-12 LPA" className="input-field" />
        <div className="flex gap-3">
          {(["remote", "hybrid", "onsite"] as const).map((style) => (
            <button key={style} onClick={() => setWorkStyle(style)} className={`px-4 py-2 rounded-button border text-sm font-dmsans capitalize ${
              workStyle === style ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-text-muted"
            }`}>{style}</button>
          ))}
        </div>
      </div>
    )},
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-poppins text-3xl font-bold text-text dark:text-white mb-3">Job & Role Finder</h1>
        <p className="font-inter text-text-muted">Tell us about yourself for personalised role recommendations</p>
      </div>

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
        <GlassCard>
          <p className="font-dmsans text-sm text-primary mb-2">Step {step + 1} of 4</p>
          <h2 className="font-montserrat text-xl font-semibold text-text dark:text-white mb-4">
            {steps[step].title}
          </h2>
          {steps[step].content}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-gray-200 rounded-button font-dmsans text-text-muted">
                Back
              </button>
            )}
            <button
              onClick={() => step < 3 ? setStep(step + 1) : getRecommendations()}
              className="btn-primary flex-1"
            >
              {step < 3 ? "Next" : "Get Recommendations"}
            </button>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
