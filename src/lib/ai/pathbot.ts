import { UserProfile } from "@/types";

interface ChatContext {
  messages: { role: string; content: string }[];
  profile: Partial<UserProfile>;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  "stream after 10th": `**Choosing your stream after Class 10** is one of the most important decisions. Here's a quick guide:

| Stream | Best For | Key Exams |
|--------|----------|-----------|
| **PCM** | Engineering, Architecture, Defence | JEE, NDA, NATA |
| **PCB** | Medicine, Pharmacy, Biotech | NEET, AIIMS |
| **PCMB** | Keeping both options open | JEE + NEET |
| **Commerce** | CA, MBA, Banking | CUET, IPMAT |
| **Arts** | Law, Civil Services, Media | CLAT, UPSC, CUET |

**My recommendation:** Take our Brain Assessment for a data-driven recommendation based on your aptitudes!`,

  "cat percentile iim": `**CAT 85 Percentile — IIM Possibilities:**

With **85 percentile**, you're competitive for:
- **IIM Kashipur, IIM Raipur, IIM Ranchi** (newer IIMs)
- **IIM Trichy, IIM Udaipur** (may need 88-90+)
- **Baby IIMs:** Jammu, Bodh Gaya, Sirmaur

**Not realistic at 85%:** IIM A, B, C, L, I, K

**Tips to improve:**
1. Focus on VARC — often the differentiator
2. Take 30+ mock tests
3. Apply to **FMS Delhi, XLRI, SPJIMR** as backups

Want me to compare specific IIMs for you?`,

  "ncc placements south india": `**Colleges with NCC + Good Placements in South India (under ₹3L/year):**

1. **NIT Trichy** — NCC ✓, Avg pkg ₹14L, Fees ~₹1.8L/yr
2. **Anna University (CEG)** — NCC ✓, Avg pkg ₹9L, Fees ~₹1L/yr
3. **COEP Pune** — NCC ✓, Avg pkg ₹11L, Fees ~₹1.2L/yr (West but close)
4. **VIT Vellore** — NCC ✓, Avg pkg ₹8L, Fees ~₹3.5L (slightly over budget)
5. **SRM Chennai** — NCC ✓, Avg pkg ₹6L, Fees ~₹2.8L/yr ✓

**CDS Preparation tip:** NCC 'C' certificate holders get bonus marks in SSB!

Shall I run a detailed college comparison for your exact rank and budget?`,

  "btech cds preparation": `**Preparing for CDS alongside BTech — Semester-wise Plan:**

**Year 1-2 (Foundation):**
- Join NCC on campus (mandatory for SSB edge)
- Build GK habit: 30 min/day (The Hindu, Manorama Yearbook)
- Stay fit: 5km runs, basic PT exercises

**Year 3 (Intensive):**
- Start Pathfinder CDS book (English, GK, Maths)
- Take weekend SSB mock interviews
- Apply for NCC 'C' certificate exam

**Year 4 (Final Push):**
- CDS exam in Feb/Aug — target final year
- SSB preparation: group tasks, OIR tests
- Backup: AFCAT (Air Force), SSC CGL

**Parallel paths:** Campus placements as Plan B, GATE for technical roles in defence R&D.`,

  "bcom jobs no experience": `**Jobs after BCom with No Experience:**

**Immediate roles (0-1 yr):**
- Accounts Executive (₹3-4.5 LPA)
- Tax Associate at CA firms (₹3-5 LPA)
- Bank PO (via IBPS exam — govt job!)
- Business Development Executive (₹3-6 LPA)

**Upskill for better roles:**
- **Tally + GST certification** → ₹4-6 LPA
- **CA Foundation / CMA Inter** → long-term ₹15L+
- **Data Analytics (Excel + SQL)** → ₹5-8 LPA

**Platforms:** Naukri, LinkedIn, Internshala (for internships first)

**Govt exams:** SSC CGL, RBI Grade B, SBI PO — excellent for commerce graduates!`,

  "software engineer product management": `**SWE → Product Management Transition (4 YOE):**

**Timeline: 12-18 months**

**Phase 1 (Months 1-3):**
- Learn product frameworks: RICE, Kano, Jobs-to-be-Done
- Start writing PRDs for features you build
- Read: "Inspired" by Marty Cagan, "Cracking the PM Interview"

**Phase 2 (Months 4-8):**
- Take on PM-adjacent work: user research, roadmap input
- Build a portfolio: case studies of products you've improved
- Certifications: Product School, Reforge (optional)

**Phase 3 (Months 9-18):**
- Apply: APM roles, Internal PM transfer, Startup PM
- Target companies: Flipkart, Razorpay, Swiggy, Atlassian
- Expected salary: ₹25-40 LPA (from ₹15-25 SWE)

**Your SWE background is a HUGE advantage** — technical PMs are in high demand!`,

  "government exams btech": `**Government Exams after BTech:**

| Exam | Role | When to Apply |
|------|------|---------------|
| **GATE** | PSU jobs (ONGC, BHEL), M.Tech | Final year |
| **ESE (IES)** | Engineering services | Final year |
| **CDS** | Army/Navy/Air Force officer | Final year |
| **SSC CGL** | Central govt posts | Anytime after grad |
| **UPSC ESE** | Railways, Telecom, CPWD | Final year |
| **ISRO/DRDO** | Scientist posts | After grad |
| **RBI Grade B** | Banking regulator | After grad |
| **State PSC** | State engineering services | Varies |

**Best strategy:** GATE + CDS in parallel during final year!`,

  "clat 2025 syllabus": `**CLAT 2025 Syllabus:**

**Section-wise (120 marks, 120 questions, 2 hours):**

1. **English Language (22-26 questions)**
   - Reading comprehension, grammar, vocabulary

2. **Current Affairs & GK (28-32 questions)**
   - National/international events, arts & culture

3. **Legal Reasoning (28-32 questions)**
   - Principles and fact situations (no prior legal knowledge needed)

4. **Logical Reasoning (22-26 questions)**
   - Short passages, arguments, inferences

5. **Quantitative Techniques (10-14 questions)**
   - Class 10 level maths, graphs, charts

**Preparation timeline:** 12-18 months
**Key books:** Universal CLAT Guide, Pearson, Word Power Made Easy`,

  "iit bombay vs iit delhi cs": `**IIT Bombay vs IIT Delhi — Computer Science Comparison:**

| Factor | IIT Bombay | IIT Delhi |
|--------|-----------|-----------|
| **Avg Package (CS)** | ₹22-24 LPA | ₹20-22 LPA |
| **Highest Package** | ₹3.6 Cr | ₹3.2 Cr |
| **Research** | Strong in AI/ML | Strong in Systems/Theory |
| **Location** | Mumbai — finance + startups | Delhi — govt + MNC HQs |
| **Campus Life** | Larger, more diverse | Compact, intense |
| **Notable Recruiters** | Google, Goldman, McKinsey | Amazon, Apple, Qualcomm |
| **Fees** | ~₹2.5L/yr | ~₹2.4L/yr |

**Verdict:** Both are exceptional. Choose **Bombay** for finance/consulting tilt, **Delhi** for tech research and proximity to NCR opportunities.

Want a side-by-side with NIT Trichy as a budget alternative?`,

  "budget 2L engineering": `**Best Engineering Colleges under ₹2L/year:**

1. **Jadavpur University** — ₹80K/yr, Avg pkg ₹10L (WBJEE)
2. **Anna University CEG** — ₹1L/yr, Avg pkg ₹9L (TNEA)
3. **DTU Delhi** — ₹1.6L/yr, Avg pkg ₹12L (JEE Main)
4. **NITs (various)** — ₹1.5-1.8L/yr, Avg pkg ₹10-14L (JEE Main)
5. **COEP Pune** — ₹1.2L/yr, Avg pkg ₹11L (MHT-CET)
6. **IIEST Shibpur** — ₹1L/yr, Avg pkg ₹8L (JEE Main)

**Strategy:** Target state counselling for best ROI. Apply for NSP scholarships!

Enter your JEE rank for a personalised ranked list?`,
};

function findBestMatch(input: string): string | null {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(KNOWLEDGE_BASE)) {
    const keywords = key.split(" ");
    const matchCount = keywords.filter((kw) => lower.includes(kw)).length;
    if (matchCount >= keywords.length * 0.6) return response;
  }

  if (lower.includes("stream") && (lower.includes("10") || lower.includes("tenth"))) return KNOWLEDGE_BASE["stream after 10th"];
  if (lower.includes("cat") && (lower.includes("percentile") || lower.includes("iim"))) return KNOWLEDGE_BASE["cat percentile iim"];
  if (lower.includes("ncc") && lower.includes("placement")) return KNOWLEDGE_BASE["ncc placements south india"];
  if (lower.includes("btech") && lower.includes("cds")) return KNOWLEDGE_BASE["btech cds preparation"];
  if (lower.includes("bcom") && lower.includes("job")) return KNOWLEDGE_BASE["bcom jobs no experience"];
  if (lower.includes("product management") || (lower.includes("software") && lower.includes("switch"))) return KNOWLEDGE_BASE["software engineer product management"];
  if (lower.includes("government") && lower.includes("btech")) return KNOWLEDGE_BASE["government exams btech"];
  if (lower.includes("clat") && lower.includes("syllabus")) return KNOWLEDGE_BASE["clat 2025 syllabus"];
  if (lower.includes("iit bombay") && lower.includes("iit delhi")) return KNOWLEDGE_BASE["iit bombay vs iit delhi cs"];
  if (lower.includes("budget") && lower.includes("2l")) return KNOWLEDGE_BASE["budget 2L engineering"];

  return null;
}

export async function generatePathBotResponse(
  userMessage: string,
  context: ChatContext
): Promise<{ content: string; quickReplies: string[] }> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    try {
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey });

      const systemPrompt = `You are PathBot, the AI career counsellor for EduPath AI — an Indian education and career guidance platform. 
You help students with stream selection, entrance exams, college recommendations, career planning, and job guidance.
Be conversational, encouraging, and specific to the Indian education system.
Use markdown formatting (bold, bullets, tables) in responses.
Remember the user's context: ${JSON.stringify(context.profile)}
If you cannot answer confidently, say: "Let me connect you to our full assessment tool for a more personalised answer" and suggest they take the Brain Assessment.
Always end with 2-3 relevant follow-up suggestions.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...context.messages.slice(-10).map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
          { role: "user", content: userMessage },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const content = response.choices[0]?.message?.content || getFallbackResponse(userMessage);
      return {
        content,
        quickReplies: generateQuickReplies(userMessage, context.profile),
      };
    } catch {
      // Fall through to knowledge base
    }
  }

  const kbMatch = findBestMatch(userMessage);
  if (kbMatch) {
    return {
      content: kbMatch,
      quickReplies: generateQuickReplies(userMessage, context.profile),
    };
  }

  return {
    content: getFallbackResponse(userMessage),
    quickReplies: ["Start Brain Assessment", "Show entrance exams", "Find colleges", "Career roadmap"],
  };
}

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("exam")) {
    return `I can help you with **all major Indian entrance exams** — JEE, NEET, CLAT, CAT, UPSC, NDA, CDS, GATE, and more!

Tell me your current stage (Class 10/12/College/Working) and I'll recommend the right exams with preparation timelines.

*Or take our full Brain Assessment for personalised guidance →*`;
  }
  if (lower.includes("college")) {
    return `Our **College Recommendation Engine** matches you with the best colleges based on:
- Your exam rank/score
- Budget (₹2L to ₹20L+/year)
- Preferences (NCC, placements, location, hostel)

Share your exam details and budget, and I'll find your perfect matches!`;
  }
  return `Great question! I'm **PathBot**, your AI career guide for Indian students and professionals.

I can help with:
- **Stream selection** after Class 10
- **Entrance exam** guidance (JEE, NEET, CLAT, CAT, UPSC...)
- **College recommendations** with budget filtering
- **Career transitions** and job guidance

*Let me connect you to our full assessment tool for a more personalised answer →* [Start Assessment](/assessment)

What would you like to explore?`;
}

function generateQuickReplies(message: string, profile: Partial<UserProfile>): string[] {
  const lower = message.toLowerCase();
  if (lower.includes("college") || lower.includes("budget")) {
    return ["Compare 3 colleges", "Show NCC colleges", "Scholarship options", "Download as PDF"];
  }
  if (lower.includes("exam") || lower.includes("jee") || lower.includes("neet")) {
    return ["Preparation timeline", "Recommended books", "Show all exams", "Start Assessment"];
  }
  if (lower.includes("career") || lower.includes("job")) {
    return ["Show job roles", "Upskill roadmap", "Compare paths", "Tell me more"];
  }
  if (profile.stage) {
    return ["Show colleges", "Compare options", "Career roadmap", "Tell me more"];
  }
  return ["Start Brain Assessment", "Which stream for me?", "Show entrance exams", "Find colleges"];
}
