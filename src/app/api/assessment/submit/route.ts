export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { Question } from '@/lib/models/Question';
import { AssessmentResult } from '@/lib/models/AssessmentResult';

export async function POST(request: Request) {
  try {
    const { assessment_id, answers } = await request.json();
    await connectToDatabase();
    
    // Fetch questions to grade
    const questions = await Question.find({ active: true }).lean();
    const qMap = new Map();
    questions.forEach((q: any) => qMap.set(q._id.toString(), q));
    
    const scores: Record<string, number> = {};
    const processedAnswers = [];
    
    for (const ans of answers) {
      const q = qMap.get(ans.question_id);
      if (!q) continue;
      
      let is_correct = null;
      if (q.question_type === 'multiple_choice') {
        is_correct = ans.answer === q.correct_answer;
        if (is_correct) {
          scores[q.dimension] = (scores[q.dimension] || 0) + 10;
        }
      } else if (q.question_type === 'likert_scale') {
        // Just add the likert value (1-5) to the score
        const val = parseInt(ans.answer, 10);
        if (!isNaN(val)) {
           scores[q.dimension] = (scores[q.dimension] || 0) + val;
        }
      }
      
      processedAnswers.push({
        question_id: ans.question_id,
        answer: ans.answer,
        response_time: ans.response_time,
        is_correct
      });
    }
    
    // Mock Recommendations for now
    const mock_recs = [
      {
        career: "Software Engineering",
        match_score: 87.5,
        strengths: ["Strong logical reasoning", "High technology interest"],
        skill_gaps: ["Data structures"]
      },
      {
        career: "Data Science",
        match_score: 83.2,
        strengths: ["Strong numerical ability"],
        skill_gaps: ["Statistics"]
      }
    ];

    const result = new AssessmentResult({
      scores,
      answers: processedAnswers,
      recommendations: mock_recs
    });
    await result.save();
    
    return NextResponse.json({
      assessment_id,
      scores,
      recommendations: mock_recs
    });
  } catch (error) {
    console.error("Error submitting assessment:", error);
    return NextResponse.json({ error: "Failed to process assessment" }, { status: 500 });
  }
}
