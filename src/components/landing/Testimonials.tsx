"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { FadeUp, ClipReveal, ParallaxLayer, LineDrawReveal } from "@/components/shared/DoraAnimations";

const testimonials = [
  { name:"Priya Sharma",  stage:"Class 10 Student, Delhi",      quote:"EduPath AI helped me choose PCM over Commerce. The brain assessment showed my logical reasoning was 85% — now I'm preparing for JEE with confidence!", rating:5, color:"card-lavender", avatar:"P", avatarBg:"bg-primary" },
  { name:"Arjun Reddy",   stage:"BTech 3rd Year, Hyderabad",    quote:"I wanted NCC + good placements under ₹3L in South India. EduPath gave me a perfect list with NIT Trichy and Anna University!",                    rating:5, color:"card-mint",    avatar:"A", avatarBg:"bg-secondary-dark" },
  { name:"Sneha Patel",   stage:"BCom Graduate, Mumbai",        quote:"As a fresh graduate I was lost. PathBot guided me to banking exams and helped me land an Accounts Executive role in 3 months.",                    rating:5, color:"card-orange",  avatar:"S", avatarBg:"bg-amber-500" },
  { name:"Rahul Mehta",   stage:"Software Engineer, Bangalore", quote:"Switching from SWE to Product Management felt impossible. EduPath's transition roadmap got me an APM role at a startup in just 4 months!",           rating:5, color:"card-pink",    avatar:"R", avatarBg:"bg-rose-400" },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <ParallaxLayer speed={0.25} className="absolute top-0 right-0 pointer-events-none">
        <div className="w-72 h-72 rounded-full opacity-10 blur-3xl bg-primary" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.35} className="absolute bottom-0 left-0 pointer-events-none">
        <div className="w-56 h-56 rounded-full opacity-10 blur-3xl bg-secondary" />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16">
          <FadeUp delay={0}><span className="badge badge-primary mb-4 inline-block">Real stories</span></FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-text mb-3 leading-tight">Student Stories</h2>
          </FadeUp>
          <LineDrawReveal className="w-44 mx-auto mb-4" delay={0.3} />
          <FadeUp delay={0.2}><p className="text-text-muted font-inter">Real students, real transformations</p></FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <ClipReveal key={i} delay={i * 0.1}>
              <motion.div
                className={`${t.color} rounded-card border p-6 relative overflow-hidden h-full`}
                whileHover={{ y: -4, transition: { duration: 0.2, type: "spring", stiffness: 300 } }}
              >
                {/* Star ratings */}
                <div className="flex gap-1 mb-3">
                  {[...Array(t.rating)].map((_, si) => (
                    <motion.div key={si}
                      initial={{ scale: 0, rotate: -30 }} whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + si * 0.06, type: "spring", stiffness: 400 }}>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>
                <Quote className="absolute top-4 right-5 w-10 h-10 text-black/5" />
                <p className="font-inter text-text-muted leading-relaxed mb-5 text-[0.93rem] italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                  <div className={`w-10 h-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white font-poppins font-bold text-sm flex-shrink-0`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-poppins font-bold text-text text-sm">{t.name}</p>
                    <p className="font-inter text-xs text-text-muted">{t.stage}</p>
                  </div>
                </div>
              </motion.div>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
