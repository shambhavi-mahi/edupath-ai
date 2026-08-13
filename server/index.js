require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/edupath-ai";
const JWT_SECRET = process.env.JWT_SECRET || "edupath-dev-secret";

// Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  name: String,
  googleId: String,
  profile: {
    stage: String,
    year: Number,
    stream: String,
    interests: [String],
    budget: String,
    preferences: [String],
    reservationCategory: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const assessmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionId: String,
  progress: mongoose.Schema.Types.Mixed,
  result: mongoose.Schema.Types.Mixed,
  shareId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

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

const assessmentSessionSchema = new mongoose.Schema({
  assessment_id: { type: String, required: true, unique: true },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  started_at: { type: Date, default: Date.now },
  completed_at: Date
});

const assessmentResponseSchema = new mongoose.Schema({
  assessment_id: String,
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answer: String,
  is_correct: Boolean,
  response_time: Number, // in milliseconds or seconds
  createdAt: { type: Date, default: Date.now }
});

const assessmentResultSchema = new mongoose.Schema({
  assessment_id: String,
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  scores: mongoose.Schema.Types.Mixed, // Stores dimensions like { "Logical Reasoning": 80, ... }
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Assessment = mongoose.model("Assessment", assessmentSchema);
const Question = mongoose.model("Question", questionSchema);
const AssessmentSession = mongoose.model("AssessmentSession", assessmentSessionSchema);
const AssessmentResponse = mongoose.model("AssessmentResponse", assessmentResponseSchema);
const AssessmentResult = mongoose.model("AssessmentResult", assessmentResultSchema);

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Routes
app.post("/api/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, email, name } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) return res.status(401).json({ error: "Invalid credentials" });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/assessment/save", async (req, res) => {
  try {
    const { sessionId, progress, result, userId } = req.body;
    const shareId = Math.random().toString(36).slice(2, 10);
    const assessment = await Assessment.findOneAndUpdate(
      { sessionId },
      { progress, result, userId, shareId, updatedAt: new Date() },
      { upsert: true, new: true }
    );
    res.json({ success: true, shareId, assessmentId: assessment._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/assessment/:shareId", async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ shareId: req.params.shareId });
    if (!assessment) return res.status(404).json({ error: "Not found" });
    res.json(assessment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// New Secure Prototype Routes
app.post("/api/assessment/start", async (req, res) => {
  try {
    // 1. Create a session
    const sessionId = Math.random().toString(36).slice(2, 12);
    const session = await AssessmentSession.create({
      assessment_id: sessionId,
      student_id: req.body.userId || null,
      status: 'in_progress'
    });

    // 2. Fetch 27 active aptitude questions + 10 interest questions
    // For MVP prototype, we just grab all active questions.
    const questions = await Question.find({ active: true });
    
    // 3. Strip correct_answer before sending to frontend
    const secureQuestions = questions.map(q => {
      return {
        id: q._id,
        dimension: q.dimension,
        question_text: q.question_text,
        question_type: q.question_type,
        difficulty: q.difficulty,
        options: q.options
      };
    });

    res.json({ assessment_id: session.assessment_id, questions: secureQuestions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/assessment/submit", async (req, res) => {
  try {
    const { assessment_id, answers, student_id } = req.body; // answers: [{ question_id, answer, response_time }]
    
    const session = await AssessmentSession.findOne({ assessment_id });
    if (!session) return res.status(404).json({ error: "Session not found" });

    let scoresByDimension = {};
    let dimensionCounts = {};

    // Evaluate answers
    for (const ans of answers) {
      const question = await Question.findById(ans.question_id);
      if (!question) continue;

      const isCorrect = (question.correct_answer === ans.answer);
      
      // Save response
      await AssessmentResponse.create({
        assessment_id,
        question_id: question._id,
        student_id: student_id || null,
        answer: ans.answer,
        is_correct: isCorrect,
        response_time: ans.response_time
      });

      // Calculate score based on type
      if (question.question_type === "likert_scale") {
        if (!dimensionCounts[question.dimension]) {
          dimensionCounts[question.dimension] = { totalRating: 0, maxPossible: 0, type: 'interest' };
        }
        dimensionCounts[question.dimension].totalRating += parseInt(ans.answer);
        dimensionCounts[question.dimension].maxPossible += 5; // Max score per Likert question is 5
      } else {
        if (!dimensionCounts[question.dimension]) {
          dimensionCounts[question.dimension] = { total: 0, correct: 0, type: 'aptitude' };
        }
        dimensionCounts[question.dimension].total += 1;
        if (isCorrect) dimensionCounts[question.dimension].correct += 1;
      }
    }

    // Compute dimension scores to out-of-100 percentage
    for (const [dim, stats] of Object.entries(dimensionCounts)) {
      if (stats.type === 'interest') {
        scoresByDimension[dim] = Math.round((stats.totalRating / stats.maxPossible) * 100);
      } else {
        scoresByDimension[dim] = Math.round((stats.correct / stats.total) * 100);
      }
    }

    // Save final result
    const result = await AssessmentResult.create({
      assessment_id,
      student_id: student_id || null,
      scores: scoresByDimension
    });

    // Complete session
    session.status = 'completed';
    session.completed_at = new Date();
    await session.save();

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profile: req.body },
      { new: true }
    );
    res.json(user.profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/health", (_, res) => res.json({ status: "ok", service: "EduPath AI Backend" }));

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`EduPath AI server running on port ${PORT}`));
  })
  .catch((err) => {
    console.warn("MongoDB not available, starting server without DB:", err.message);
    app.listen(PORT, () => console.log(`EduPath AI server running on port ${PORT} (no DB)`));
  });

module.exports = app;
