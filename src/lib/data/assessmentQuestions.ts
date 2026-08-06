export interface AssessmentQuestion {
  id: string;
  dimension: string;
  type: "mcq" | "scenario";
  question: string;
  options: { label: string; value: number; trait: string }[];
}

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "lr-1",
    dimension: "Logical Reasoning",
    type: "scenario",
    question: "If all Bloops are Razzies and all Razzies are Lazzies, which statement must be true?",
    options: [
      { label: "All Bloops are Lazzies", value: 4, trait: "deductive" },
      { label: "Some Lazzies are not Bloops", value: 2, trait: "partial" },
      { label: "No Bloops are Lazzies", value: 0, trait: "incorrect" },
      { label: "All Lazzies are Bloops", value: 1, trait: "incorrect" },
    ],
  },
  {
    id: "lr-2",
    dimension: "Logical Reasoning",
    type: "mcq",
    question: "Complete the pattern: 2, 6, 12, 20, 30, ?",
    options: [
      { label: "40", value: 2, trait: "close" },
      { label: "42", value: 4, trait: "correct" },
      { label: "36", value: 1, trait: "incorrect" },
      { label: "38", value: 0, trait: "incorrect" },
    ],
  },
  {
    id: "math-1",
    dimension: "Mathematical Aptitude",
    type: "mcq",
    question: "A train travels 360 km in 4 hours. At the same speed, how far will it travel in 7 hours?",
    options: [
      { label: "540 km", value: 2, trait: "close" },
      { label: "630 km", value: 4, trait: "correct" },
      { label: "720 km", value: 1, trait: "incorrect" },
      { label: "480 km", value: 0, trait: "incorrect" },
    ],
  },
  {
    id: "math-2",
    dimension: "Mathematical Aptitude",
    type: "scenario",
    question: "If 3x + 7 = 22, what is the value of 2x - 5?",
    options: [
      { label: "5", value: 4, trait: "correct" },
      { label: "10", value: 2, trait: "close" },
      { label: "3", value: 1, trait: "incorrect" },
      { label: "15", value: 0, trait: "incorrect" },
    ],
  },
  {
    id: "ling-1",
    dimension: "Linguistic Ability",
    type: "mcq",
    question: "Choose the word closest in meaning to 'EPHEMERAL':",
    options: [
      { label: "Permanent", value: 0, trait: "opposite" },
      { label: "Fleeting", value: 4, trait: "correct" },
      { label: "Ancient", value: 1, trait: "incorrect" },
      { label: "Powerful", value: 0, trait: "incorrect" },
    ],
  },
  {
    id: "ling-2",
    dimension: "Linguistic Ability",
    type: "scenario",
    question: "Read: 'The scientist's hypothesis, though initially dismissed, eventually revolutionized the field.' What does 'dismissed' imply here?",
    options: [
      { label: "Rejected or not taken seriously", value: 4, trait: "correct" },
      { label: "Celebrated widely", value: 0, trait: "opposite" },
      { label: "Published in a journal", value: 1, trait: "partial" },
      { label: "Proven immediately", value: 0, trait: "incorrect" },
    ],
  },
  {
    id: "music-1",
    dimension: "Musical Intelligence",
    type: "scenario",
    question: "You hear a rhythm: ta-ta-ti-ti-ta. Which pattern matches this beat structure?",
    options: [
      { label: "2 long + 2 short + 1 long", value: 4, trait: "correct" },
      { label: "All equal beats", value: 0, trait: "incorrect" },
      { label: "3 short + 2 long", value: 1, trait: "incorrect" },
      { label: "1 long + 4 short", value: 2, trait: "close" },
    ],
  },
  {
    id: "music-2",
    dimension: "Musical Intelligence",
    type: "mcq",
    question: "How do you best remember a new song?",
    options: [
      { label: "Reading the lyrics", value: 2, trait: "visual" },
      { label: "Humming and feeling the rhythm", value: 4, trait: "auditory" },
      { label: "Watching music videos", value: 3, trait: "visual-auditory" },
      { label: "Writing down notes", value: 1, trait: "kinesthetic" },
    ],
  },
  {
    id: "creative-1",
    dimension: "Creative Thinking",
    type: "scenario",
    question: "Design a solution: Your school has too much plastic waste. What's your most creative approach?",
    options: [
      { label: "Art installations from recycled plastic", value: 4, trait: "divergent" },
      { label: "Ban all plastic immediately", value: 1, trait: "restrictive" },
      { label: "Fine students who use plastic", value: 0, trait: "punitive" },
      { label: "Send waste to another school", value: 0, trait: "avoidant" },
    ],
  },
  {
    id: "creative-2",
    dimension: "Creative Thinking",
    type: "mcq",
    question: "When solving problems, you prefer to:",
    options: [
      { label: "Follow established methods", value: 1, trait: "convergent" },
      { label: "Brainstorm many unusual ideas first", value: 4, trait: "divergent" },
      { label: "Ask others for the answer", value: 2, trait: "collaborative" },
      { label: "Avoid problems you can't solve quickly", value: 0, trait: "avoidant" },
    ],
  },
  {
    id: "inter-1",
    dimension: "Interpersonal Skills",
    type: "scenario",
    question: "Your team member is upset because their idea was rejected. You would:",
    options: [
      { label: "Listen empathetically and acknowledge their effort", value: 4, trait: "empathetic" },
      { label: "Tell them to toughen up", value: 0, trait: "dismissive" },
      { label: "Ignore it — not your problem", value: 0, trait: "avoidant" },
      { label: "Complain to the teacher about them", value: 1, trait: "escalating" },
    ],
  },
  {
    id: "inter-2",
    dimension: "Interpersonal Skills",
    type: "mcq",
    question: "In group projects, you naturally:",
    options: [
      { label: "Take charge and delegate", value: 3, trait: "leader" },
      { label: "Mediate conflicts and keep harmony", value: 4, trait: "facilitator" },
      { label: "Do your part quietly", value: 2, trait: "contributor" },
      { label: "Let others handle everything", value: 0, trait: "passive" },
    ],
  },
  {
    id: "intra-1",
    dimension: "Intrapersonal Skills",
    type: "scenario",
    question: "After failing an important test, your first thought is:",
    options: [
      { label: "What can I learn from this and improve?", value: 4, trait: "growth" },
      { label: "I'm just not smart enough", value: 0, trait: "fixed" },
      { label: "The test was unfair", value: 1, trait: "external" },
      { label: "I'll pretend it didn't happen", value: 0, trait: "avoidant" },
    ],
  },
  {
    id: "intra-2",
    dimension: "Intrapersonal Skills",
    type: "mcq",
    question: "You understand your strengths best when:",
    options: [
      { label: "Reflecting alone on your experiences", value: 4, trait: "self-aware" },
      { label: "Getting praise from others", value: 2, trait: "external" },
      { label: "Comparing yourself to friends", value: 1, trait: "comparative" },
      { label: "Taking personality quizzes online", value: 3, trait: "exploratory" },
    ],
  },
  {
    id: "interest-1",
    dimension: "Interest Assessment",
    type: "mcq",
    question: "Which activity excites you the most?",
    options: [
      { label: "Building apps or solving coding puzzles", value: 4, trait: "tech" },
      { label: "Debating social issues and writing essays", value: 3, trait: "humanities" },
      { label: "Conducting science experiments", value: 4, trait: "science" },
      { label: "Managing money and business ideas", value: 3, trait: "commerce" },
    ],
  },
  {
    id: "interest-2",
    dimension: "Interest Assessment",
    type: "scenario",
    question: "You have a free weekend. You choose to:",
    options: [
      { label: "Visit a science museum or planetarium", value: 4, trait: "science" },
      { label: "Paint, sketch, or make music", value: 3, trait: "arts" },
      { label: "Play sports with friends", value: 3, trait: "sports" },
      { label: "Read about history or philosophy", value: 3, trait: "humanities" },
    ],
  },
  {
    id: "personality-1",
    dimension: "Personality Type",
    type: "mcq",
    question: "At a party, you typically:",
    options: [
      { label: "Talk to many people and feel energized", value: 4, trait: "extrovert" },
      { label: "Have deep conversations with 1-2 people", value: 3, trait: "ambivert" },
      { label: "Prefer to leave early or skip it", value: 1, trait: "introvert" },
      { label: "Observe from the sidelines", value: 2, trait: "introvert" },
    ],
  },
  {
    id: "personality-2",
    dimension: "Personality Type",
    type: "scenario",
    question: "When making decisions, you rely more on:",
    options: [
      { label: "Logic, data, and objective analysis", value: 4, trait: "thinking" },
      { label: "Gut feeling and personal values", value: 3, trait: "feeling" },
      { label: "What others are doing", value: 1, trait: "conforming" },
      { label: "Avoiding decisions until necessary", value: 0, trait: "avoidant" },
    ],
  },
];

export const DIMENSIONS = [
  "Logical Reasoning",
  "Mathematical Aptitude",
  "Linguistic Ability",
  "Musical Intelligence",
  "Creative Thinking",
  "Interpersonal Skills",
  "Intrapersonal Skills",
  "Interest Assessment",
  "Personality Type",
];
