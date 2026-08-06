"use client";

import Accordion from "@/components/shared/Accordion";

const faqs = [
  { question: "Is EduPath AI free to use?", answer: "Yes! The brain assessment, basic college recommendations, and PathBot chatbot are free. Premium features like detailed PDF reports and exam reminders are available with an account." },
  { question: "How accurate is the brain assessment?", answer: "Our assessment is inspired by established frameworks (Multiple Intelligences, Big Five personality traits) and calibrated for Indian students. It provides strong directional guidance, best used alongside counsellor advice." },
  { question: "Which entrance exams do you cover?", answer: "We cover 30+ exams including JEE, NEET, CLAT, CAT, UPSC, NDA, CDS, GATE, BITSAT, VITEEE, state CETs, and more. Recommendations are tailored to your stream and stage." },
  { question: "Can I prepare for CDS alongside my BTech?", answer: "Absolutely! EduPath specialises in parallel career path planning. We'll create a semester-wise roadmap for CDS preparation alongside your engineering degree, including NCC recommendations." },
  { question: "How does college recommendation work?", answer: "Enter your exam rank/score, budget, and preferences (NCC, placements, location, hostel). Our engine ranks 100+ colleges and explains why each matches your specific goals." },
  { question: "Can parents view my report?", answer: "Yes! Download your PDF report or generate a shareable link that parents and counsellors can access without creating an account." },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-card dark:bg-background-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading text-center mx-auto">Frequently Asked Questions</h2>
        <p className="text-center text-text-muted font-inter mb-12">
          Everything you need to know about EduPath AI
        </p>
        <Accordion items={faqs} />
      </div>
    </section>
  );
}
