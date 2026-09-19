export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Question } from '@/lib/models/Question';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    
    // Fetch all active questions from MongoDB
    const allQuestions = await Question.find({ active: true }).lean();
    
    // Strip correct_answer to prevent cheating
    const safeQuestions = allQuestions.map(q => {
      const { correct_answer, explanation, ...safeQ } = q;
      // Convert _id to id for frontend compatibility
      return { ...safeQ, id: (safeQ as any)._id.toString() };
    });

    const assessment_id = uuidv4();
    
    return NextResponse.json({
      assessment_id,
      questions: safeQuestions
    });
  } catch (error) {
    console.error("Error starting assessment:", error);
    return NextResponse.json({ error: "Failed to load questions" }, { status: 500 });
  }
}
