# EduPath AI
AI-powered career guidance and brain assessment web application for Indian students and professionals.

## Features
- **PathBot AI Chatbot** — Floating widget with career counselling for streams, exams, colleges, and jobs
- **Brain Power Assessment** — 9-dimension aptitude test with radar chart visualization
- **Stream Recommendation** — PCM, PCB, Commerce, Arts guidance after Class 10
- **Entrance Exam Guidance** — JEE, NEET, CLAT, CAT, UPSC, NDA, CDS, and 30+ more
- **College Recommendation Engine** — Budget, NCC, placement, and preference-based matching
- **Career Path Planner** — Primary, parallel, and fallback career roadmaps
- **Job & Role Finder** — For graduates and career switchers
- **Dark Mode** — Full dark theme support
- **Save & Resume** — Local storage progress persistence
- **PDF Export** — Download career reports

## Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, Framer Motion, Recharts
- **AI:** OpenAI GPT-4o (with built-in knowledge base fallback)
- **Auth:** NextAuth.js (Google OAuth + Email/Password)
- **Backend:** Express.js + MongoDB
- **Fonts:** Poppins, Montserrat, Inter, DM Sans, Outfit

## Getting Started
```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev

# (Optional) Start Express backend
npm run server
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables
See `.env.example` for required variables. PathBot works without an API key using the built-in knowledge base.

## Project Structure
```
src/
  app/           # Next.js pages and API routes
  components/    # React components (landing, chatbot, assessment, etc.)
  contexts/      # React context (app state, theme)
  lib/           # Utilities, AI, data
  types/         # TypeScript types
server/          # Express backend
```

## Credits
Made by **Shambhavi** and **Shomya Sarthak Dixit**
