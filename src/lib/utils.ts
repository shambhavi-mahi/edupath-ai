import { College, UserProfile, Stream, AssessmentResult } from "@/types";
import { COLLEGES } from "./data/colleges";
import { EXAMS } from "./data/exams";

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getBudgetMax(budget?: string): number {
  const map: Record<string, number> = {
    "under-2L": 200000,
    "2-5L": 500000,
    "5-10L": 1000000,
    "10-20L": 2000000,
    "20L-plus": Infinity,
    "scholarship": 500000,
  };
  return map[budget || "5-10L"] || 1000000;
}

export function recommendColleges(profile: Partial<UserProfile> & { preferences?: string[] }): College[] {
  const maxBudget = getBudgetMax(profile.budget);
  const prefs = (profile.preferences || []).map((p) => p.toLowerCase());

  return COLLEGES.map((college) => {
    let score = 50;
    const reasons: string[] = [];

    if (college.feesPerYear <= maxBudget) {
      score += 15;
      reasons.push(`Within your budget of ${formatCurrency(maxBudget)}/year`);
    } else if (profile.budget === "scholarship") {
      score += 5;
      reasons.push("Scholarship options available");
    } else {
      score -= 20;
    }

    if (prefs.some((p) => p.includes("ncc")) && college.nccUnit) {
      score += 20;
      reasons.push("Has active NCC unit on campus");
    }

    if (prefs.some((p) => p.includes("placement"))) {
      score += college.avgPackage / 50000;
      reasons.push(`Strong placements — avg ${formatCurrency(college.avgPackage)}`);
    }

    if (prefs.some((p) => p.includes("research")) && college.researchCulture === "High") {
      score += 15;
      reasons.push("Excellent research culture");
    }

    if (prefs.some((p) => p.includes("hostel")) && college.hostelAvailable) {
      score += 10;
      reasons.push("Hostel facilities available");
    }

    if (prefs.some((p) => p.includes("south")) && ["Tamil Nadu", "Karnataka", "Kerala", "Andhra Pradesh", "Telangana"].includes(college.state)) {
      score += 15;
      reasons.push("Located in South India");
    }

    if (prefs.some((p) => p.includes("cds") || p.includes("defence"))) {
      if (college.nccUnit) {
        score += 10;
        reasons.push("NCC unit helps CDS/SSB preparation alongside studies");
      }
    }

    if (profile.stream === "PCM" || profile.stage === "class-11-12") {
      if (college.exams.some((e) => ["JEE Advanced", "JEE Main", "BITSAT", "VITEEE"].includes(e))) {
        score += 10;
      }
    }

    return {
      ...college,
      matchScore: Math.min(100, Math.round(score)),
      matchReason: reasons.join(". ") || "Good overall fit for your profile",
    };
  })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 10);
}

export function recommendExams(profile: Partial<UserProfile>): typeof EXAMS {
  const stream = profile.stream || "PCM";
  return EXAMS.filter((exam) => {
    if (exam.streams.includes(stream)) return true;
    if (profile.stage === "undergraduate" && ["GATE", "CAT", "CDS", "UPSC CSE"].includes(exam.name.split(" ")[0])) return true;
    if (profile.stage === "postgraduate" && ["CAT", "GATE"].includes(exam.name)) return true;
    return exam.streams.includes("PCM") && stream === "PCM";
  });
}

export function recommendStream(result: AssessmentResult): { stream: Stream; reasons: string[] } {
  const scores = Object.fromEntries(result.dimensions.map((d) => [d.name, d.score]));
  const math = scores["Mathematical Aptitude"] || 0;
  const logic = scores["Logical Reasoning"] || 0;
  const linguistic = scores["Linguistic Ability"] || 0;
  const creative = scores["Creative Thinking"] || 0;
  const interpersonal = scores["Interpersonal Skills"] || 0;

  if (math >= 70 && logic >= 65) {
    return {
      stream: "PCM",
      reasons: [
        `Strong Mathematical Aptitude (${math}%) and Logical Reasoning (${logic}%)`,
        "Ideal for engineering, architecture, and pure sciences",
        "Opens doors to JEE, BITSAT, NDA, and NATA",
      ],
    };
  }
  if (math >= 55 && logic >= 50 && linguistic >= 60) {
    return {
      stream: "PCMB",
      reasons: [
        "Balanced aptitude across science and language",
        "Keeps both medical (NEET) and engineering (JEE) options open",
        "Best if you're undecided between doctor and engineer",
      ],
    };
  }
  if (linguistic >= 70 && interpersonal >= 65) {
    return {
      stream: "Arts",
      reasons: [
        `Excellent Linguistic Ability (${linguistic}%) and people skills`,
        "Perfect for law (CLAT), civil services (UPSC), journalism, and design",
        "CUET opens central university humanities programmes",
      ],
    };
  }
  if (linguistic >= 60 && math >= 50) {
    return {
      stream: "Commerce-Maths",
      reasons: [
        "Strong blend of analytical and communication skills",
        "Ideal for CA, CFA, economics, and BBA/MBA path via CAT",
        "Commerce with Maths keeps quantitative career options open",
      ],
    };
  }
  if (creative >= 70) {
    return {
      stream: "Vocational",
      reasons: [
        `High Creative Thinking score (${creative}%)`,
        "Consider design (NIFT/NID), media, animation, or entrepreneurship streams",
        "Vocational courses offer hands-on skill-based careers",
      ],
    };
  }

  return {
    stream: "PCB",
    reasons: [
      "Strong aptitude for biological sciences and empathy",
      "Ideal for NEET, pharmacy, biotechnology, and life sciences",
      "Medical and allied health careers are a great fit",
    ],
  };
}

// Calculate dimension scores from assessment answers
export function calculateDimensionScoresSync(
  answers: Record<string, number>,
  questions: { id: string; dimension: string }[]
): AssessmentResult["dimensions"] {
  const dimensionTotals: Record<string, { sum: number; count: number }> = {};

  for (const [questionId, score] of Object.entries(answers)) {
    const question = questions.find((q) => q.id === questionId);
    if (!question) continue;
    if (!dimensionTotals[question.dimension]) {
      dimensionTotals[question.dimension] = { sum: 0, count: 0 };
    }
    dimensionTotals[question.dimension].sum += score;
    dimensionTotals[question.dimension].count += 1;
  }

  return Object.entries(dimensionTotals).map(([name, { sum, count }]) => ({
    name,
    score: Math.round((sum / count) * 100),
    maxScore: 100,
  }));
}

export function getPersonalityType(dimensions: AssessmentResult["dimensions"]): string {
  const personality = dimensions.find((d) => d.name === "Personality Type")?.score || 50;
  const interpersonal = dimensions.find((d) => d.name === "Interpersonal Skills")?.score || 50;
  const intrapersonal = dimensions.find((d) => d.name === "Intrapersonal Skills")?.score || 50;

  if (personality >= 70 && interpersonal >= 65) return "ENFP — The Campaigner";
  if (personality <= 40 && intrapersonal >= 70) return "INTJ — The Architect";
  if (interpersonal >= 75) return "ESFJ — The Consul";
  if (intrapersonal >= 75) return "INFP — The Mediator";
  if (personality >= 60) return "ENTJ — The Commander";
  return "ISTJ — The Logistician";
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
