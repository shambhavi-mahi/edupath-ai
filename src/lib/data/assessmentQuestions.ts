export interface AssessmentQuestion {
  id: string;
  dimension: string;
  type: "mcq" | "scenario";
  question: string;
  options: { label: string; value: number; trait: string }[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "Q01",
    dimension: "Logical Reasoning",
    type: "mcq",
    question: "Sample question for Logical Reasoning (Q01)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q02",
    dimension: "Logical Reasoning",
    type: "mcq",
    question: "Sample question for Logical Reasoning (Q02)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q03",
    dimension: "Logical Reasoning",
    type: "mcq",
    question: "Sample question for Logical Reasoning (Q03)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q04",
    dimension: "Logical Reasoning",
    type: "mcq",
    question: "Sample question for Logical Reasoning (Q04)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q05",
    dimension: "Logical Reasoning",
    type: "mcq",
    question: "Sample question for Logical Reasoning (Q05)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q06",
    dimension: "Numerical Ability",
    type: "mcq",
    question: "Sample question for Numerical Ability (Q06)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q07",
    dimension: "Numerical Ability",
    type: "mcq",
    question: "Sample question for Numerical Ability (Q07)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q08",
    dimension: "Numerical Ability",
    type: "mcq",
    question: "Sample question for Numerical Ability (Q08)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q09",
    dimension: "Numerical Ability",
    type: "mcq",
    question: "Sample question for Numerical Ability (Q09)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q10",
    dimension: "Numerical Ability",
    type: "mcq",
    question: "Sample question for Numerical Ability (Q10)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q11",
    dimension: "Verbal Ability",
    type: "mcq",
    question: "Sample question for Verbal Ability (Q11)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q12",
    dimension: "Verbal Ability",
    type: "mcq",
    question: "Sample question for Verbal Ability (Q12)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q13",
    dimension: "Verbal Ability",
    type: "mcq",
    question: "Sample question for Verbal Ability (Q13)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q14",
    dimension: "Verbal Ability",
    type: "mcq",
    question: "Sample question for Verbal Ability (Q14)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q15",
    dimension: "Verbal Ability",
    type: "mcq",
    question: "Sample question for Verbal Ability (Q15)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q16",
    dimension: "Analytical Thinking",
    type: "mcq",
    question: "Sample question for Analytical Thinking (Q16)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q17",
    dimension: "Analytical Thinking",
    type: "mcq",
    question: "Sample question for Analytical Thinking (Q17)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q18",
    dimension: "Analytical Thinking",
    type: "mcq",
    question: "Sample question for Analytical Thinking (Q18)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q19",
    dimension: "Analytical Thinking",
    type: "mcq",
    question: "Sample question for Analytical Thinking (Q19)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q20",
    dimension: "Analytical Thinking",
    type: "mcq",
    question: "Sample question for Analytical Thinking (Q20)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q21",
    dimension: "Problem Solving",
    type: "mcq",
    question: "Sample question for Problem Solving (Q21)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q22",
    dimension: "Problem Solving",
    type: "mcq",
    question: "Sample question for Problem Solving (Q22)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q23",
    dimension: "Problem Solving",
    type: "mcq",
    question: "Sample question for Problem Solving (Q23)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q24",
    dimension: "Problem Solving",
    type: "mcq",
    question: "Sample question for Problem Solving (Q24)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q25",
    dimension: "Problem Solving",
    type: "mcq",
    question: "Sample question for Problem Solving (Q25)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q26",
    dimension: "Memory",
    type: "mcq",
    question: "Sample question for Memory (Q26)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q27",
    dimension: "Memory",
    type: "mcq",
    question: "Sample question for Memory (Q27)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q28",
    dimension: "Memory",
    type: "mcq",
    question: "Sample question for Memory (Q28)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q29",
    dimension: "Memory",
    type: "mcq",
    question: "Sample question for Memory (Q29)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q30",
    dimension: "Memory",
    type: "mcq",
    question: "Sample question for Memory (Q30)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q31",
    dimension: "Creativity",
    type: "mcq",
    question: "Sample question for Creativity (Q31)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q32",
    dimension: "Creativity",
    type: "mcq",
    question: "Sample question for Creativity (Q32)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q33",
    dimension: "Creativity",
    type: "mcq",
    question: "Sample question for Creativity (Q33)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q34",
    dimension: "Creativity",
    type: "mcq",
    question: "Sample question for Creativity (Q34)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q35",
    dimension: "Creativity",
    type: "mcq",
    question: "Sample question for Creativity (Q35)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q36",
    dimension: "Attention",
    type: "mcq",
    question: "Sample question for Attention (Q36)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q37",
    dimension: "Attention",
    type: "mcq",
    question: "Sample question for Attention (Q37)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q38",
    dimension: "Attention",
    type: "mcq",
    question: "Sample question for Attention (Q38)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q39",
    dimension: "Attention",
    type: "mcq",
    question: "Sample question for Attention (Q39)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q40",
    dimension: "Attention",
    type: "mcq",
    question: "Sample question for Attention (Q40)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q41",
    dimension: "Spatial Reasoning",
    type: "mcq",
    question: "Sample question for Spatial Reasoning (Q41)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q42",
    dimension: "Spatial Reasoning",
    type: "mcq",
    question: "Sample question for Spatial Reasoning (Q42)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q43",
    dimension: "Spatial Reasoning",
    type: "mcq",
    question: "Sample question for Spatial Reasoning (Q43)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q44",
    dimension: "Spatial Reasoning",
    type: "mcq",
    question: "Sample question for Spatial Reasoning (Q44)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
  {
    id: "Q45",
    dimension: "Spatial Reasoning",
    type: "mcq",
    question: "Sample question for Spatial Reasoning (Q45)",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },
];

export const DIMENSIONS = [
  "Logical Reasoning",
  "Numerical Ability",
  "Verbal Ability",
  "Analytical Thinking",
  "Problem Solving",
  "Memory",
  "Creativity",
  "Attention",
  "Spatial Reasoning",
];
