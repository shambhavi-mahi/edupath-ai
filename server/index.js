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

const User = mongoose.model("User", userSchema);
const Assessment = mongoose.model("Assessment", assessmentSchema);

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
