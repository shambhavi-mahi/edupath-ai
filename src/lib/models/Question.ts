import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  label: String,
  value: String
}, { _id: false });

const questionSchema = new mongoose.Schema({
  dimension: { type: String, required: true },
  question_text: { type: String, required: true },
  question_type: { type: String, default: "multiple_choice" },
  difficulty: String, // 'easy', 'medium', 'hard', or 'n/a'
  options: [optionSchema],
  correct_answer: String,
  explanation: String,
  active: { type: Boolean, default: true },
  version: { type: Number, default: 1 }
});

export const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);
