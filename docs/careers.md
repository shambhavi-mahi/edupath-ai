# Career Knowledge Base

## Overview

EduPath maintains a structured career knowledge base that maps streams → careers → entrance exams → colleges → job roles. This base powers the recommendation engine and PathBot AI chatbot.

## Career Clusters

### 🔬 Science & Engineering
| Career | Key Exams | Top Colleges |
|---|---|---|
| Software Engineer | JEE, GATE, BITSAT | IITs, NITs, BITS |
| Data Scientist | JEE, GATE (CS/DA) | IITs, IISc |
| Mechanical Engineer | JEE, GATE (ME) | IITs, NITs |
| Civil Engineer | JEE, GATE (CE) | IITs, NITs |
| Electronics Engineer | JEE, GATE (ECE) | IITs, NITs |
| Aerospace Engineer | JEE, IIST | IIT Bombay, IIST |

### 🏥 Healthcare & Medicine
| Career | Key Exams | Top Colleges |
|---|---|---|
| Doctor (MBBS) | NEET-UG | AIIMS, CMC, JIPMER |
| Dentist (BDS) | NEET-UG | Govt. Dental Colleges |
| Pharmacist | NEET / State CET | Pharmacy Colleges |
| Physiotherapist | NEET / State | Allied Health Colleges |
| Nursing | State Nursing CET | Nursing Institutes |
| Veterinary | NEET | Vet Colleges |

### ⚖️ Law & Civil Services
| Career | Key Exams | Top Colleges |
|---|---|---|
| Lawyer | CLAT, AILET, LSAT | NLUs, Faculty of Law |
| IAS / IPS Officer | UPSC CSE | — |
| State PSC Officer | State PSC | — |
| Judge | Judiciary Exam | — |

### 💼 Business & Management
| Career | Key Exams | Top Colleges |
|---|---|---|
| MBA (Management) | CAT, XAT, MAT, GMAT | IIMs, XLRI, FMS |
| CA (Chartered Accountant) | CA Foundation/Inter/Final | ICAI |
| Investment Banker | CAT / GMAT | IIMs, ISB |
| Entrepreneur | — | — |

### 🎨 Design & Creative Arts
| Career | Key Exams | Top Colleges |
|---|---|---|
| UX/Product Designer | NID DAT, UCEED, CEED | NID, IIT IDC, MIT |
| Fashion Designer | NID DAT, NIFT | NIFT, Pearl Academy |
| Architect | NATA, JEE Paper 2 | SPA, IIT Kharagpur |
| Animator / Game Designer | — | Frameboxx, Arena |

### 🛡️ Defence & Uniformed Services
| Career | Key Exams | Top Colleges |
|---|---|---|
| Indian Army Officer | NDA, CDS | NDA Pune, OTA |
| Indian Navy Officer | NDA, CDS | INA |
| Indian Air Force | NDA, CDS, AFCAT | AFA |
| Police (IPS) | UPSC CSE | — |

### 📡 Media, Journalism & Communication
| Career | Key Exams | Top Colleges |
|---|---|---|
| Journalist | IIMC, XIC entrance | IIMC, Symbiosis |
| Content Creator | — | — |
| PR & Communications | CAT / MAT | MICA, Symbiosis |

### 🏫 Education & Research
| Career | Key Exams | Top Colleges |
|---|---|---|
| Teacher | CTET, B.Ed entrance | BHU, DU, Jamia |
| Research Scientist | GATE, CSIR-NET, JRF | IISc, IITs, TIFR |
| Professor | UGC-NET | Universities |

## Knowledge Base Schema

```json
{
  "career": "Software Engineer",
  "cluster": "Science & Engineering",
  "streams": ["PCM"],
  "aptitude_fit": ["Logical Reasoning", "Numerical Aptitude", "Technical Inclination"],
  "exams": ["JEE Main", "JEE Advanced", "BITSAT", "GATE"],
  "degree": ["B.Tech CS", "B.E. IT", "BCA + MCA"],
  "duration_years": 4,
  "avg_salary_lpa": 8,
  "growth_outlook": "Very High",
  "skills_required": ["Programming", "DSA", "System Design", "Math"],
  "colleges": ["IIT Bombay", "IIT Delhi", "NIT Trichy", "BITS Pilani"],
  "job_roles": ["Frontend Dev", "Backend Dev", "Full Stack", "DevOps", "ML Engineer"]
}
```

## Stream → Career Mapping

| Stream | Primary Career Clusters |
|---|---|
| PCM (Science — Math) | Engineering, Architecture, Defence, Data Science |
| PCB (Science — Biology) | Medicine, Pharmacy, Biotech, Nursing, Veterinary |
| Commerce | CA, MBA, Banking, Finance, Entrepreneurship |
| Arts / Humanities | Law, Civil Services, Journalism, Design, Education |
| Vocational | Technical trades, Entrepreneurship, Specialised roles |
