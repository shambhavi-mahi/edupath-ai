export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Question } from '@/lib/models/Question';

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

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    // Check if seeded
    const count = await Question.countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: "Database already seeded.", count });
    }
    
    const questions = [];

    // Generate Aptitude Questions
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

    // Generate Interest Questions
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
    
    return NextResponse.json({ message: "Successfully seeded the database", count: questions.length });
  } catch (error) {
    console.error("Error seeding database:", error);
    return NextResponse.json({ error: "Failed to seed database" }, { status: 500 });
  }
}
