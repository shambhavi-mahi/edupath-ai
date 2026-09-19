import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question_id: String,
  answer: String,
  response_time: Number,
  is_correct: Boolean
}, { _id: false });

const assessmentResultSchema = new mongoose.Schema({
  userId: { type: String, required: false }, // Can be null for anonymous
  scores: { type: Map, of: Number },
  answers: [answerSchema],
  recommendations: [
    {
      career: String,
      match_score: Number,
      strengths: [String],
      skill_gaps: [String]
    }
  ],
  completedAt: { type: Date, default: Date.now }
});

export const AssessmentResult = mongoose.models.AssessmentResult || mongoose.model('AssessmentResult', assessmentResultSchema);
