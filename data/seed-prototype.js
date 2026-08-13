require("dotenv").config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/edupath-ai";

const questionSchema = new mongoose.Schema({
  dimension: String,
  question_text: String,
  question_type: { type: String, default: "multiple_choice" },
  difficulty: String, // 'easy', 'medium', 'hard'
  options: [{ label: String, value: String }],
  correct_answer: String,
  explanation: String,
  active: { type: Boolean, default: true },
  version: { type: Number, default: 1 }
});

const Question = mongoose.model("Question", questionSchema);

const aptitudeDimensions = [
  'Logical Reasoning',
  'Numerical Ability',
  'Verbal Ability',
  'Analytical Thinking',
  'Problem Solving',
  'Memory',
  'Creativity',
  'Attention',
  'Spatial Reasoning'
];

const interestFields = [
  'Technology',
  'Engineering',
  'Healthcare',
  'Science & Research',
  'Business & Finance',
  'Law & Public Service',
  'Creative & Design',
  'Media & Communication',
  'Education & Psychology',
  'Environment & Agriculture'
];

const interestQuestionsData = [
  { cat: 'Technology', q: 'I enjoy figuring out how computers, apps, or digital technologies work.' },
  { cat: 'Technology', q: 'I enjoy solving problems using programming or technology.' },
  { cat: 'Engineering', q: 'I enjoy understanding how machines and physical systems work.' },
  { cat: 'Engineering', q: 'I like designing or building things and figuring out how they can be improved.' },
  { cat: 'Healthcare', q: 'I enjoy learning about the human body and how it works.' },
  { cat: 'Healthcare', q: 'I am interested in work that involves helping people improve their health.' },
  { cat: 'Science & Research', q: 'I enjoy investigating why things happen and finding evidence to explain them.' },
  { cat: 'Science & Research', q: 'I like conducting experiments and discovering new information.' },
  { cat: 'Business & Finance', q: 'I enjoy thinking about how businesses make decisions and grow.' },
  { cat: 'Business & Finance', q: 'I am interested in understanding money, markets, or investments.' },
  { cat: 'Law & Public Service', q: 'I enjoy understanding rules, laws, and how society works.' },
  { cat: 'Law & Public Service', q: 'I am interested in solving social problems and contributing to public life.' },
  { cat: 'Creative & Design', q: 'I enjoy creating visual designs, illustrations, or digital interfaces.' },
  { cat: 'Creative & Design', q: 'I like finding creative and visually appealing ways to communicate ideas.' },
  { cat: 'Media & Communication', q: 'I enjoy writing, speaking, presenting, or creating content for others.' },
  { cat: 'Media & Communication', q: 'I like researching topics and explaining them clearly to other people.' },
  { cat: 'Education & Psychology', q: 'I enjoy helping others learn or understand difficult concepts.' },
  { cat: 'Education & Psychology', q: 'I am interested in understanding how people think, learn, and behave.' },
  { cat: 'Environment & Agriculture', q: 'I enjoy learning about nature, ecosystems, or environmental problems.' },
  { cat: 'Environment & Agriculture', q: 'I am interested in solving problems related to sustainability, food, or agriculture.' }
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB for seeding...");

  // Clear existing
  await Question.deleteMany({});
  console.log("Cleared existing questions.");

  const questions = [];

  // Generate 27 Aptitude Questions (3 per dimension)
  for (const dim of aptitudeDimensions) {
    const difficulties = ['easy', 'medium', 'hard'];
    for (let i = 0; i < 3; i++) {
      questions.push({
        dimension: dim,
        question_text: `Prototype question for ${dim} (Difficulty: ${difficulties[i]})`,
        question_type: "multiple_choice",
        difficulty: difficulties[i],
        options: [
          { label: "A", value: "Option A" },
          { label: "B", value: "Option B" },
          { label: "C", value: "Option C" },
          { label: "D", value: "Option D" }
        ],
        correct_answer: "Option A",
        explanation: "Option A is the placeholder correct answer.",
        active: true,
        version: 1
      });
    }
  }

  // Generate 20 Interest Questions
  for (const item of interestQuestionsData) {
    questions.push({
      dimension: item.cat,
      question_text: item.q,
      question_type: "likert_scale",
      difficulty: "n/a",
      options: [
        { label: "1 - Strongly Dislike", value: "1" },
        { label: "2 - Dislike", value: "2" },
        { label: "3 - Neutral", value: "3" },
        { label: "4 - Like", value: "4" },
        { label: "5 - Strongly Like", value: "5" }
      ],
      correct_answer: "none",
      explanation: "No correct answer for interests.",
      active: true,
      version: 1
    });
  }

  await Question.insertMany(questions);
  console.log(`Seeded ${questions.length} questions successfully.`);
  
  mongoose.connection.close();
}

seed().catch(err => {
  console.error(err);
  mongoose.connection.close();
});
