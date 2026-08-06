export type UserStage =
  | "class-9-10"
  | "class-11-12"
  | "undergraduate"
  | "postgraduate"
  | "job-seeker"
  | "career-switcher";

export type Stream =
  | "PCM"
  | "PCB"
  | "PCMB"
  | "Commerce-Maths"
  | "Commerce"
  | "Arts"
  | "Vocational";

export type BudgetRange =
  | "under-2L"
  | "2-5L"
  | "5-10L"
  | "10-20L"
  | "20L-plus"
  | "scholarship";

export type ReservationCategory = "General" | "OBC" | "SC" | "ST" | "EWS";

export interface AssessmentDimension {
  name: string;
  score: number;
  maxScore: number;
}

export interface AssessmentResult {
  dimensions: AssessmentDimension[];
  personalityType: string;
  recommendedStream: Stream;
  streamReasons: string[];
  completedAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  feedback?: "helpful" | "not-helpful" | null;
  quickReplies?: string[];
}

export interface UserProfile {
  stage: UserStage;
  year?: number;
  stream?: Stream;
  interests: string[];
  budget?: BudgetRange;
  preferences: string[];
  reservationCategory?: ReservationCategory;
  examScores?: Record<string, number | string>;
  skills?: string[];
  experience?: number;
  salaryExpectation?: string;
  workStyle?: "remote" | "hybrid" | "onsite";
}

export interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "Govt" | "Private" | "Deemed";
  feesPerYear: number;
  avgPackage: number;
  highestPackage: number;
  nccUnit: boolean;
  exams: string[];
  placementCompanies: string[];
  notableAlumni: string[];
  researchCulture: "High" | "Medium" | "Low";
  hostelAvailable: boolean;
  scholarships: string[];
  matchReason?: string;
  matchScore?: number;
}

export interface Exam {
  id: string;
  name: string;
  field: string;
  eligibility: string;
  pattern: string;
  dates: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Very Hard";
  preparationTimeline: string;
  books: string[];
  resources: { name: string; type: "free" | "paid" }[];
  streams: string[];
}

export interface CareerPath {
  id: string;
  title: string;
  type: "primary" | "parallel" | "fallback";
  steps: { title: string; duration: string; description: string }[];
  exams?: string[];
}

export interface JobRole {
  title: string;
  companies: string[];
  skills: string[];
  certifications: string[];
  salaryRange: string;
  platforms: string[];
}
