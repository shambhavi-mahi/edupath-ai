# MVP — Minimum Viable Product

## Goal

Ship a working, demonstrable version of EduPath AI that validates the core hypothesis:
> **"Personalised, AI-powered career guidance improves student decision confidence and satisfaction compared to generic advice."**

## MVP Scope

### ✅ In Scope

| Feature | Description |
|---|---|
| **Brain Power Assessment** | 9-dimension aptitude + interest test (~60 questions) |
| **Stream Recommendation** | PCM / PCB / Commerce / Arts output with reasoning |
| **Career Path Suggestions** | Top 3 matched career clusters with roadmap |
| **Entrance Exam Guidance** | Relevant exams per career path with key details |
| **College Finder** | Basic filter-based college list (stream, budget, location) |
| **PathBot AI Chatbot** | Conversational guidance using knowledge base + GPT-4o |
| **Results Dashboard** | Radar chart, career cards, exam timeline |
| **Save & Export** | localStorage save + PDF download of report |

### ❌ Out of Scope (for MVP)

- Mobile app (iOS / Android)
- Regional language support (Hindi, Tamil, etc.)
- Real-time college cutoff data
- Peer comparison / leaderboard
- Parent dashboard
- School/institution portal
- ML model (use rule-based + GPT-4o for MVP; ML comes in v2)

## Tech Stack (MVP)

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, Framer Motion |
| AI / Chatbot | OpenAI GPT-4o + built-in knowledge base fallback |
| Auth | NextAuth.js (Google OAuth + email/password) |
| Backend | Express.js (Node) |
| Database | MongoDB Atlas |
| Deployment | Vercel (frontend) + Railway / Render (backend) |

## Success Metrics

| Metric | Target |
|---|---|
| Assessment completion rate | ≥ 70% |
| User satisfaction (post-assessment rating) | ≥ 4/5 |
| Career recommendation relevance (self-rated) | ≥ 75% "helpful" |
| PathBot resolution rate | ≥ 60% queries resolved without escalation |
| Returning users within 7 days | ≥ 25% |

## Milestones

| Milestone | Target Date | Status |
|---|---|---|
| Landing page + basic UI | Aug 2026 | ✅ Done |
| Brain assessment (frontend) | Aug 2026 | ✅ Done |
| PathBot chatbot (GPT-4o) | Aug 2026 | ✅ Done |
| College finder (basic) | Aug 2026 | ✅ Done |
| Results dashboard | Aug 2026 | ✅ Done |
| Backend API + MongoDB | Sep 2026 | 🔄 In Progress |
| ML stream classifier (v1) | Oct 2026 | ⏳ Planned |
| ML career recommender (v1) | Nov 2026 | ⏳ Planned |
| Beta launch | Dec 2026 | ⏳ Planned |

## v2 Roadmap (Post-MVP)

- ML-powered personalisation replacing rule-based system
- Hindi / regional language support
- Mobile-responsive PWA
- School partnerships and bulk assessment portal
- Real-time NIRF & cutoff data integration
- Peer comparison and progress tracking
