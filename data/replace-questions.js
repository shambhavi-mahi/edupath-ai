const fs = require('fs');
const path = require('path');

const dimensions = [
  { name: 'Logical Reasoning', start: 1, end: 5 },
  { name: 'Numerical Ability', start: 6, end: 10 },
  { name: 'Verbal Ability', start: 11, end: 15 },
  { name: 'Analytical Thinking', start: 16, end: 20 },
  { name: 'Problem Solving', start: 21, end: 25 },
  { name: 'Memory', start: 26, end: 30 },
  { name: 'Creativity', start: 31, end: 35 },
  { name: 'Attention', start: 36, end: 40 },
  { name: 'Spatial Reasoning', start: 41, end: 45 }
];

let tsContent = `export interface AssessmentQuestion {
  id: string;
  dimension: string;
  type: "mcq" | "scenario";
  question: string;
  options: { label: string; value: number; trait: string }[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
`;

for (const dim of dimensions) {
  for (let i = dim.start; i <= dim.end; i++) {
    const id = `Q${i.toString().padStart(2, '0')}`;
    tsContent += `  {
    id: "${id}",
    dimension: "${dim.name}",
    type: "mcq",
    question: "Sample question for ${dim.name} (${id})",
    options: [
      { label: "Correct Answer", value: 1, trait: "correct" },
      { label: "Wrong Answer 1", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 2", value: 0, trait: "incorrect" },
      { label: "Wrong Answer 3", value: 0, trait: "incorrect" }
    ],
  },\n`;
  }
}

tsContent += `];\n\nexport const DIMENSIONS = [\n`;
for (const dim of dimensions) {
  tsContent += `  "${dim.name}",\n`;
}
tsContent += `];\n`;

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'lib', 'data', 'assessmentQuestions.ts'),
  tsContent
);
console.log('Done');
