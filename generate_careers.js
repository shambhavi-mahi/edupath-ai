const fs = require('fs');
const path = require('path');

const careers = [
  // 1. TECHNOLOGY
  {
    name: "Software Engineering",
    family: "Technology",
    interests: { "Technology": 5, "Engineering": 3, "Science & Research": 3, "Healthcare": 1, "Creative & Design": 2, "Business & Finance": 2 },
    skills: { "Logical Reasoning": 5, "Problem Solving": 5, "Numerical Ability": 4, "Creativity": 3 },
    subjects: { "Computer Science": "High", "Mathematics": "High", "Physics": "Moderate", "English": "Moderate" },
    degrees: ["B.Tech Computer Science (CSE)", "BCA", "B.Sc Computer Science"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT", "VITEEE"],
    requiredSkills: ["Programming (Python, Java, C++)", "Data Structures & Algorithms", "System Design"],
    roadmap: ["Learn Python/JavaScript", "Build small web projects", "Learn Data Structures & Algorithms", "Contribute to Open Source", "Explore Internships"]
  },
  {
    name: "Data Science",
    family: "Technology",
    interests: { "Technology": 5, "Science & Research": 5, "Business & Finance": 3, "Engineering": 3 },
    skills: { "Numerical Ability": 5, "Logical Reasoning": 5, "Problem Solving": 4, "Verbal Ability": 3 },
    subjects: { "Mathematics": "High", "Computer Science": "High", "Statistics": "High" },
    degrees: ["B.Tech Data Science", "B.Sc Statistics", "B.Sc Mathematics and Computing"],
    exams: ["JEE Main", "CUET (UG) - Maths/Stats", "ISI Admission Test"],
    requiredSkills: ["Python/R", "Statistics & Probability", "Machine Learning Basics", "SQL"],
    roadmap: ["Learn Python and SQL", "Study Statistics and Probability", "Learn Pandas/NumPy", "Build predictive models on Kaggle"]
  },
  {
    name: "Artificial Intelligence / ML",
    family: "Technology",
    interests: { "Technology": 5, "Science & Research": 5, "Engineering": 4, "Creative & Design": 2 },
    skills: { "Numerical Ability": 5, "Logical Reasoning": 5, "Problem Solving": 5 },
    subjects: { "Mathematics": "High", "Computer Science": "High", "Physics": "Moderate" },
    degrees: ["B.Tech AI & Data Science", "B.Tech CSE (AI Spec)"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    requiredSkills: ["Python", "Calculus & Linear Algebra", "Deep Learning Frameworks (PyTorch/TensorFlow)"],
    roadmap: ["Master Python and Math foundation", "Learn classical Machine Learning", "Study Neural Networks", "Build computer vision/NLP projects"]
  },
  {
    name: "Cybersecurity",
    family: "Technology",
    interests: { "Technology": 5, "Law & Public Service": 3, "Engineering": 3 },
    skills: { "Logical Reasoning": 5, "Problem Solving": 5, "Attention to Detail": 4 },
    subjects: { "Computer Science": "High", "Mathematics": "Moderate", "Physics": "Moderate" },
    degrees: ["B.Tech Cybersecurity", "BCA", "B.Sc Cyber Security"],
    exams: ["JEE Main", "State Engineering Entrance Exams"],
    requiredSkills: ["Networking (TCP/IP)", "Operating Systems (Linux)", "Ethical Hacking", "Cryptography"],
    roadmap: ["Learn Linux basics and Networking", "Study OWASP Top 10", "Practice on HackTheBox/TryHackMe", "Get CompTIA Security+ Certification"]
  },
  {
    name: "Cloud Computing",
    family: "Technology",
    interests: { "Technology": 5, "Business & Finance": 3, "Engineering": 4 },
    skills: { "Logical Reasoning": 4, "Problem Solving": 4, "Numerical Ability": 3 },
    subjects: { "Computer Science": "High", "Mathematics": "Moderate" },
    degrees: ["B.Tech CSE (Cloud Computing)", "BCA"],
    exams: ["JEE Main", "State Engineering Exams"],
    requiredSkills: ["AWS/Azure/GCP Basics", "Linux Administration", "Networking", "DevOps Basics"],
    roadmap: ["Learn Linux and Networking", "Get AWS Cloud Practitioner certification", "Learn Docker and Containers", "Learn CI/CD pipelines"]
  },

  // 2. ENGINEERING
  {
    name: "Mechanical Engineering",
    family: "Engineering",
    interests: { "Engineering": 5, "Technology": 4, "Science & Research": 3 },
    skills: { "Spatial Reasoning": 5, "Logical Reasoning": 4, "Numerical Ability": 4, "Problem Solving": 4 },
    subjects: { "Physics": "High", "Mathematics": "High", "Chemistry": "Moderate" },
    degrees: ["B.Tech Mechanical Engineering"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT", "State CETs"],
    requiredSkills: ["CAD/CAM Software", "Thermodynamics", "Mechanics", "Materials Science"],
    roadmap: ["Master High School Physics/Math", "Learn AutoCAD/SolidWorks", "Join Robotics/SAE club in college", "Explore Mechatronics"]
  },
  {
    name: "Electrical Engineering",
    family: "Engineering",
    interests: { "Engineering": 5, "Technology": 4, "Science & Research": 4 },
    skills: { "Logical Reasoning": 5, "Numerical Ability": 5, "Problem Solving": 4 },
    subjects: { "Physics": "High", "Mathematics": "High", "Computer Science": "Moderate" },
    degrees: ["B.Tech Electrical Engineering", "B.Tech Electrical & Electronics Engineering (EEE)"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    requiredSkills: ["Circuit Design", "Control Systems", "Power Systems", "Programming (C/C++)"],
    roadmap: ["Master Electricity/Magnetism in Physics", "Learn basic circuit simulations (SPICE)", "Learn Arduino/Microcontrollers", "Explore IoT"]
  },
  {
    name: "Electronics Engineering",
    family: "Engineering",
    interests: { "Engineering": 5, "Technology": 5, "Science & Research": 3 },
    skills: { "Logical Reasoning": 5, "Problem Solving": 4, "Spatial Reasoning": 3 },
    subjects: { "Physics": "High", "Mathematics": "High", "Computer Science": "High" },
    degrees: ["B.Tech Electronics & Communication Engineering (ECE)"],
    exams: ["JEE Main", "JEE Advanced", "BITSAT"],
    requiredSkills: ["Digital Electronics", "Microprocessors", "Signal Processing", "Embedded C"],
    roadmap: ["Learn Arduino/Raspberry Pi", "Learn basic C programming", "Study semiconductor physics", "Build IoT projects"]
  },
  {
    name: "Civil Engineering",
    family: "Engineering",
    interests: { "Engineering": 5, "Environment & Agriculture": 3, "Law & Public Service": 2 },
    skills: { "Spatial Reasoning": 5, "Numerical Ability": 4, "Problem Solving": 4 },
    subjects: { "Physics": "High", "Mathematics": "High", "Chemistry": "Moderate" },
    degrees: ["B.Tech Civil Engineering", "B.Arch (Architecture is related)"],
    exams: ["JEE Main", "JEE Advanced", "NATA (for Arch)"],
    requiredSkills: ["Structural Analysis", "AutoCAD/Revit", "Fluid Mechanics", "Project Management"],
    roadmap: ["Master Physics (Mechanics)", "Learn basic CAD", "Understand sustainable materials", "Explore construction project internships"]
  },

  // 3. HEALTHCARE & LIFE SCIENCES
  {
    name: "Medicine",
    family: "Healthcare & Life Sciences",
    interests: { "Healthcare": 5, "Science & Research": 5, "Education & Psychology": 3 },
    skills: { "Memory": 5, "Attention to Detail": 5, "Problem Solving": 4, "Interpersonal": 4 },
    subjects: { "Biology": "High", "Chemistry": "High", "Physics": "High", "Mathematics": "Low" },
    degrees: ["MBBS"],
    exams: ["NEET (UG)"],
    requiredSkills: ["Anatomy & Physiology", "Clinical Diagnosis", "Empathy & Communication", "High pressure decision making"],
    roadmap: ["Master NCERT Biology/Chemistry", "Prepare extensively for NEET", "Join pre-med volunteering", "Develop strong study habits"]
  },
  {
    name: "Nursing",
    family: "Healthcare & Life Sciences",
    interests: { "Healthcare": 5, "Education & Psychology": 4, "Science & Research": 2 },
    skills: { "Interpersonal": 5, "Attention to Detail": 5, "Memory": 3, "Problem Solving": 3 },
    subjects: { "Biology": "High", "Chemistry": "Moderate", "English": "High" },
    degrees: ["B.Sc Nursing", "GNM"],
    exams: ["State Nursing Entrance Exams", "NEET (used by some institutes)"],
    requiredSkills: ["Patient Care", "Clinical Monitoring", "Empathy", "Time Management"],
    roadmap: ["Focus on Biology", "Gain First Aid/CPR certification", "Volunteer at local clinics", "Prepare for nursing entrances"]
  },
  {
    name: "Pharmacy",
    family: "Healthcare & Life Sciences",
    interests: { "Healthcare": 4, "Science & Research": 4, "Business & Finance": 2 },
    skills: { "Memory": 5, "Numerical Ability": 3, "Attention to Detail": 5 },
    subjects: { "Chemistry": "High", "Biology": "High", "Mathematics": "Moderate" },
    degrees: ["B.Pharm", "Pharm.D"],
    exams: ["NEET (UG)", "State CETs (e.g., MHT CET)"],
    requiredSkills: ["Pharmacology", "Chemistry (Organic)", "Regulatory Knowledge", "Dispensing"],
    roadmap: ["Master Organic Chemistry", "Understand human anatomy", "Prepare for B.Pharm entrances", "Explore clinical research"]
  },
  {
    name: "Biotechnology",
    family: "Healthcare & Life Sciences",
    interests: { "Science & Research": 5, "Healthcare": 4, "Technology": 3, "Environment & Agriculture": 3 },
    skills: { "Logical Reasoning": 4, "Numerical Ability": 3, "Attention to Detail": 4 },
    subjects: { "Biology": "High", "Chemistry": "High", "Mathematics": "Moderate", "Physics": "Moderate" },
    degrees: ["B.Tech Biotechnology", "B.Sc Biotechnology"],
    exams: ["JEE Main", "NEET (UG)", "CUET (UG)"],
    requiredSkills: ["Genetics", "Molecular Biology", "Bioinformatics", "Lab Techniques"],
    roadmap: ["Master Biology and Chemistry", "Learn basic Python for Bioinformatics", "Understand genetic engineering basics", "Aim for research internships"]
  },

  // 4. BUSINESS
  {
    name: "Finance",
    family: "Business",
    interests: { "Business & Finance": 5, "Science & Research": 2, "Technology": 2 },
    skills: { "Numerical Ability": 5, "Logical Reasoning": 4, "Attention to Detail": 5 },
    subjects: { "Mathematics": "High", "Economics": "High", "Accountancy": "High" },
    degrees: ["B.Com (Hons)", "BBA Finance", "B.A. Economics"],
    exams: ["CUET (UG)", "CA Foundation", "IPMAT"],
    requiredSkills: ["Financial Analysis", "Accounting Principles", "Excel Modeling", "Economic Theory"],
    roadmap: ["Master Mathematics and Accounting", "Learn Advanced Excel", "Start reading financial news", "Prepare for CA/CFA or MBA"]
  },
  {
    name: "Business Analytics",
    family: "Business",
    interests: { "Business & Finance": 5, "Technology": 4, "Science & Research": 3 },
    skills: { "Numerical Ability": 5, "Logical Reasoning": 4, "Problem Solving": 4 },
    subjects: { "Mathematics": "High", "Computer Science": "Moderate", "Economics": "Moderate" },
    degrees: ["BBA Business Analytics", "B.Tech Data Science", "B.Sc Statistics"],
    exams: ["CUET (UG)", "IPMAT"],
    requiredSkills: ["Data Visualization (Tableau/PowerBI)", "SQL", "Statistics", "Business Strategy"],
    roadmap: ["Learn SQL and Excel", "Study basic Statistics", "Learn PowerBI/Tableau", "Understand business case studies"]
  },
  {
    name: "Marketing",
    family: "Business",
    interests: { "Business & Finance": 4, "Media & Communication": 5, "Creative & Design": 3, "Education & Psychology": 3 },
    skills: { "Verbal Ability": 5, "Creativity": 4, "Interpersonal": 4 },
    subjects: { "English": "High", "Business Studies": "High", "Psychology": "Moderate" },
    degrees: ["BBA Marketing", "B.A. Mass Communication"],
    exams: ["CUET (UG)", "IPMAT"],
    requiredSkills: ["Digital Marketing", "Copywriting", "Consumer Psychology", "Data Analytics (Basic)"],
    roadmap: ["Learn Digital Marketing (SEO/Ads)", "Practice writing copy", "Understand social media algorithms", "Build a personal brand or blog"]
  },
  {
    name: "Entrepreneurship",
    family: "Business",
    interests: { "Business & Finance": 5, "Technology": 3, "Law & Public Service": 3 },
    skills: { "Problem Solving": 5, "Interpersonal": 5, "Logical Reasoning": 4, "Creativity": 4 },
    subjects: { "Business Studies": "High", "Economics": "High", "Mathematics": "Moderate" },
    degrees: ["BBA Entrepreneurship", "B.Tech (often a path)"],
    exams: ["CUET (UG)", "IPMAT"],
    requiredSkills: ["Leadership", "Financial Literacy", "Product Management", "Sales"],
    roadmap: ["Start a small campus project", "Learn basics of accounting/finance", "Read startup case studies", "Network extensively"]
  },

  // 5. CREATIVE
  {
    name: "UI/UX Design",
    family: "Creative",
    interests: { "Creative & Design": 5, "Technology": 4, "Education & Psychology": 3 },
    skills: { "Creativity": 5, "Spatial Reasoning": 4, "Problem Solving": 4, "Interpersonal": 3 },
    subjects: { "Computer Science": "Moderate", "Psychology": "Moderate", "Art/Design": "High" },
    degrees: ["B.Des (Interaction Design)", "BCA", "B.FA"],
    exams: ["UCEED", "NID DAT"],
    requiredSkills: ["Figma/Adobe XD", "User Research", "Wireframing", "Visual Design"],
    roadmap: ["Learn Figma basics", "Study human-computer interaction", "Re-design existing apps for practice", "Build a design portfolio"]
  },
  {
    name: "Graphic Design",
    family: "Creative",
    interests: { "Creative & Design": 5, "Media & Communication": 4, "Technology": 2 },
    skills: { "Creativity": 5, "Spatial Reasoning": 4, "Attention to Detail": 4 },
    subjects: { "Art/Design": "High", "Computer Science": "Low" },
    degrees: ["B.Des (Visual Communication)", "B.FA"],
    exams: ["NID DAT", "UCEED"],
    requiredSkills: ["Adobe Creative Suite", "Typography", "Color Theory", "Branding"],
    roadmap: ["Master Photoshop and Illustrator", "Study typography and color theory", "Create fake brand identities", "Build a Behance portfolio"]
  },
  {
    name: "Animation",
    family: "Creative",
    interests: { "Creative & Design": 5, "Technology": 3, "Media & Communication": 3 },
    skills: { "Creativity": 5, "Spatial Reasoning": 5, "Attention to Detail": 4 },
    subjects: { "Art/Design": "High", "Computer Science": "Moderate" },
    degrees: ["B.Des (Animation)", "B.Sc Animation"],
    exams: ["NID DAT", "UCEED"],
    requiredSkills: ["3D Modeling (Blender/Maya)", "Storyboarding", "Motion Graphics", "Video Editing"],
    roadmap: ["Learn basic sketching", "Learn Blender (free 3D software)", "Study principles of animation", "Create short animated loops"]
  },

  // 6. LAW & PUBLIC SERVICE
  {
    name: "Law",
    family: "Law & Public Service",
    interests: { "Law & Public Service": 5, "Media & Communication": 4, "Business & Finance": 2 },
    skills: { "Verbal Ability": 5, "Logical Reasoning": 5, "Memory": 4, "Attention to Detail": 4 },
    subjects: { "English": "High", "Political Science": "High", "History": "Moderate" },
    degrees: ["BA LLB", "BBA LLB"],
    exams: ["CLAT", "AILET", "LSAT India"],
    requiredSkills: ["Legal Research", "Argumentation", "Drafting", "Critical Thinking"],
    roadmap: ["Improve reading speed and comprehension", "Start following national news", "Prepare for CLAT logic/legal reasoning", "Participate in MUNs/Debates"]
  },
  {
    name: "Civil Services",
    family: "Law & Public Service",
    interests: { "Law & Public Service": 5, "Education & Psychology": 3, "Science & Research": 2 },
    skills: { "Memory": 5, "Problem Solving": 4, "Verbal Ability": 4, "Logical Reasoning": 3 },
    subjects: { "History": "High", "Political Science": "High", "Geography": "High", "Economics": "High" },
    degrees: ["B.A. (Various)", "B.Sc/B.Tech (Any degree valid)"],
    exams: ["UPSC CSE", "State PSCs"],
    requiredSkills: ["Public Administration", "General Awareness", "Analytical Writing", "Decision Making"],
    roadmap: ["Read daily newspapers (The Hindu)", "Master NCERT humanities subjects", "Develop strong essay writing skills", "Begin UPSC foundational prep"]
  },
  {
    name: "Public Policy",
    family: "Law & Public Service",
    interests: { "Law & Public Service": 5, "Business & Finance": 3, "Science & Research": 3 },
    skills: { "Logical Reasoning": 5, "Verbal Ability": 4, "Numerical Ability": 3 },
    subjects: { "Economics": "High", "Political Science": "High", "Statistics": "Moderate" },
    degrees: ["B.A. Economics", "B.A. Public Policy"],
    exams: ["CUET (UG)"],
    requiredSkills: ["Policy Analysis", "Data Interpretation", "Economics", "Research Writing"],
    roadmap: ["Study micro and macro economics", "Learn basic data analysis", "Follow government policy changes", "Read policy briefs"]
  },

  // 7. SCIENCE & RESEARCH
  {
    name: "Physics",
    family: "Science & Research",
    interests: { "Science & Research": 5, "Technology": 3, "Engineering": 3 },
    skills: { "Numerical Ability": 5, "Logical Reasoning": 5, "Spatial Reasoning": 4 },
    subjects: { "Physics": "High", "Mathematics": "High", "Chemistry": "Moderate" },
    degrees: ["B.Sc (Hons) Physics", "BS-MS Dual Degree"],
    exams: ["CUET (UG)", "NEST", "IISER Aptitude Test"],
    requiredSkills: ["Advanced Mathematics", "Experimental Design", "Data Analysis (Python)", "Theoretical Modeling"],
    roadmap: ["Master Calculus and Mechanics", "Read Feynman Lectures", "Prepare for IISER/NEST", "Learn Python for data modeling"]
  },
  {
    name: "Chemistry",
    family: "Science & Research",
    interests: { "Science & Research": 5, "Healthcare": 3, "Environment & Agriculture": 3 },
    skills: { "Memory": 4, "Logical Reasoning": 4, "Attention to Detail": 5 },
    subjects: { "Chemistry": "High", "Physics": "Moderate", "Mathematics": "Moderate" },
    degrees: ["B.Sc (Hons) Chemistry", "BS-MS Dual Degree"],
    exams: ["CUET (UG)", "NEST", "IISER Aptitude Test"],
    requiredSkills: ["Organic Synthesis", "Spectroscopy", "Lab Safety", "Analytical Chemistry"],
    roadmap: ["Master Organic and Physical Chemistry", "Understand lab safety", "Prepare for IISER/NEST", "Explore chemical engineering overlaps"]
  },
  {
    name: "Mathematics",
    family: "Science & Research",
    interests: { "Science & Research": 5, "Technology": 3, "Business & Finance": 3 },
    skills: { "Numerical Ability": 5, "Logical Reasoning": 5, "Problem Solving": 5 },
    subjects: { "Mathematics": "High", "Computer Science": "Moderate", "Physics": "Moderate" },
    degrees: ["B.Sc (Hons) Mathematics", "B.Math", "B.Stat"],
    exams: ["ISI Admission Test", "CMI Entrance", "CUET (UG)"],
    requiredSkills: ["Abstract Algebra", "Calculus", "Proof Writing", "Algorithm Analysis"],
    roadmap: ["Move beyond high school calculation math", "Learn to write mathematical proofs", "Prepare for ISI/CMI exams", "Learn Python/R"]
  },
  {
    name: "Scientific Research",
    family: "Science & Research",
    interests: { "Science & Research": 5, "Education & Psychology": 3, "Environment & Agriculture": 3 },
    skills: { "Logical Reasoning": 5, "Problem Solving": 5, "Verbal Ability": 4 },
    subjects: { "Physics": "High", "Chemistry": "High", "Biology": "High", "Mathematics": "High" },
    degrees: ["BS-MS Dual Degree", "B.Tech/B.Sc followed by Ph.D"],
    exams: ["NEST", "IISER Aptitude Test", "JEE Advanced (for IISc)"],
    requiredSkills: ["Research Methodology", "Scientific Writing", "Statistical Analysis", "Grant Writing"],
    roadmap: ["Focus on core sciences deeply", "Prepare for IISc/IISER", "Seek summer research fellowships", "Learn LaTeX and Python"]
  },

  // 8. COMMUNICATION & SOCIAL SCIENCES
  {
    name: "Journalism / Media",
    family: "Communication & Social Sciences",
    interests: { "Media & Communication": 5, "Law & Public Service": 4, "Creative & Design": 3 },
    skills: { "Verbal Ability": 5, "Interpersonal": 4, "Attention to Detail": 4 },
    subjects: { "English": "High", "Political Science": "High", "History": "Moderate" },
    degrees: ["B.A. Journalism & Mass Communication"],
    exams: ["CUET (UG)", "Institute Specific Entrances"],
    requiredSkills: ["Writing & Editing", "Investigative Research", "Interviewing", "Multimedia storytelling"],
    roadmap: ["Start a school newsletter or blog", "Improve writing and grammar", "Follow diverse news sources", "Learn basic video editing"]
  },
  {
    name: "Psychology",
    family: "Communication & Social Sciences",
    interests: { "Education & Psychology": 5, "Healthcare": 3, "Science & Research": 3 },
    skills: { "Interpersonal": 5, "Verbal Ability": 4, "Logical Reasoning": 4 },
    subjects: { "Psychology": "High", "Biology": "Moderate", "Statistics": "Moderate" },
    degrees: ["B.A./B.Sc Psychology"],
    exams: ["CUET (UG)"],
    requiredSkills: ["Empathy", "Research Methods", "Statistical Analysis", "Counseling Basics"],
    roadmap: ["Read intro psychology books", "Understand basic statistics (important for research)", "Volunteer for mental health initiatives", "Prepare for CUET"]
  },
  {
    name: "Education",
    family: "Communication & Social Sciences",
    interests: { "Education & Psychology": 5, "Media & Communication": 3, "Science & Research": 2 },
    skills: { "Interpersonal": 5, "Verbal Ability": 5, "Creativity": 3 },
    subjects: { "Any core subject": "High", "English": "High", "Psychology": "Moderate" },
    degrees: ["B.A. B.Ed (Integrated)", "B.Sc B.Ed"],
    exams: ["NCET", "State B.Ed Entrances"],
    requiredSkills: ["Pedagogy", "Public Speaking", "Patience", "Curriculum Design"],
    roadmap: ["Tutor younger students", "Master a core subject you love", "Develop public speaking skills", "Learn about EdTech trends"]
  }
];

let md = `# Career Knowledge Base & Taxonomy (Step 6)

This document contains the intermediate career knowledge base linking student profiles to actual career paths. The data here serves as the curated product rule set for the V1 Career Matching Engine.

## Master Taxonomy Table

| Career Path | Family | Key Interests | Key Skills | Key Subjects |
|---|---|---|---|---|
`;

careers.forEach(c => {
  const topInterests = Object.keys(c.interests).sort((a,b) => c.interests[b] - c.interests[a]).slice(0, 2).join(", ");
  const topSkills = Object.keys(c.skills).sort((a,b) => c.skills[b] - c.skills[a]).slice(0, 2).join(", ");
  const topSubjects = Object.keys(c.subjects).filter(s => c.subjects[s] === "High").join(", ") || Object.keys(c.subjects)[0];
  md += `| **${c.name}** | ${c.family} | ${topInterests} | ${topSkills} | ${topSubjects} |\n`;
});

md += `\n## Detailed Career Profiles\n\n`;

careers.forEach(c => {
  md += `### ${c.name}\n`;
  md += `- **Family:** ${c.family}\n`;
  md += `- **Description:** A core career path within ${c.family}.\n\n`;

  md += `#### 1. Weights (Scale 1-5)\n`;
  md += `**Interest Alignment:**\n`;
  Object.entries(c.interests).forEach(([k, v]) => { md += `- ${k}: ${v}\n`; });
  md += `\n**Skill / Aptitude Alignment:**\n`;
  Object.entries(c.skills).forEach(([k, v]) => { md += `- ${k}: ${v}\n`; });
  
  md += `\n#### 2. Academic Relevance\n`;
  Object.entries(c.subjects).forEach(([k, v]) => { md += `- **${k}:** ${v}\n`; });

  md += `\n#### 3. Pathways & Requirements\n`;
  md += `- **Related Degrees:** ${c.degrees.join(", ")}\n`;
  md += `- **Relevant Exams:** ${c.exams.join(", ")}\n`;
  md += `- **Required Industry Skills:** ${c.requiredSkills.join(", ")}\n`;

  md += `\n#### 4. Skill Roadmap (V1 Guidance)\n`;
  c.roadmap.forEach((step, idx) => { md += `${idx + 1}. ${step}\n`; });
  md += `\n---\n\n`;
});

const outPath = path.join(__dirname, 'docs', 'careers.md');
if (!fs.existsSync(path.join(__dirname, 'docs'))) {
  fs.mkdirSync(path.join(__dirname, 'docs'));
}
fs.writeFileSync(outPath, md);
console.log('Successfully generated docs/careers.md with 27 careers.');
