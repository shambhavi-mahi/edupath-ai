# Brain Power Assessment

## Overview

The EduPath assessment is a multi-dimensional aptitude and interest evaluation designed to holistically profile a student. It forms the foundation of all personalised recommendations.

## Assessment Dimensions

The assessment evaluates **9 brain dimensions**:

| # | Dimension | What It Measures |
|---|---|---|
| 1 | **Logical Reasoning** | Pattern recognition, analytical thinking, problem solving |
| 2 | **Verbal Ability** | Language comprehension, communication, reading skills |
| 3 | **Numerical Aptitude** | Mathematical reasoning, quantitative skills |
| 4 | **Spatial Intelligence** | Visualisation, design thinking, geometry |
| 5 | **Scientific Curiosity** | Interest and ability in science concepts |
| 6 | **Creative Thinking** | Originality, divergent thinking, artistic inclination |
| 7 | **Social Awareness** | Empathy, leadership, collaborative skills |
| 8 | **Technical Inclination** | Interest in technology, systems, and engineering |
| 9 | **Business Acumen** | Entrepreneurial thinking, economics, management interest |

## Assessment Structure

- **Format:** MCQ + scenario-based questions + self-rating sliders
- **Duration:** ~20–30 minutes
- **Questions:** ~60–80 questions across dimensions
- **Sections:**
  1. Aptitude (objective questions)
  2. Interest inventory (subjective ratings)
  3. Academic performance inputs (self-reported grades)
  4. Goals & preferences (career values, lifestyle choices)

## Output

- **Radar chart** showing scores across all 9 dimensions
- **Top 3 strength areas** highlighted
- **Stream recommendation** (PCM / PCB / Commerce / Arts / Vocational)
- **Career cluster matches** (e.g., Engineering, Healthcare, Design, Business)
- **Entrance exam suggestions** aligned to career clusters
- **Personalised roadmap** — next 1, 3, 5 year steps

## Data Collected

| Field | Type | Purpose |
|---|---|---|
| Dimension scores | Numeric (0–100) | ML input features |
| Interest ratings | Likert scale (1–5) | Career cluster matching |
| Grade inputs | Categorical | Realistic recommendation filtering |
| Career values | Multi-select | Goal alignment |
| Class / age | Categorical | Cohort-appropriate advice |

## ML Integration

Assessment scores feed into:
1. **Stream Classifier** — predicts best-fit stream
2. **Career Recommender** — ranks career paths by compatibility
3. **Exam Suggester** — maps career → entrance exams
4. **College Matcher** — filters colleges by profile + preferences

## Privacy

- No personally identifiable information required
- Assessment results stored locally (localStorage) by default
- Optional account creation to save and track progress over time
