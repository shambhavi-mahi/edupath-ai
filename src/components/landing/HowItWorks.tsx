"use client";

import { motion } from "framer-motion";
import { UserCheck, Brain, Target, Rocket } from "lucide-react";
import { FadeUp, ParallaxLayer, LineDrawReveal } from "@/components/shared/DoraAnimations";

const steps = [
  { icon: UserCheck, title: "Select Your Stage",    desc: "Tell us where you are — Class 10, 12, college, or working professional.", color:"card-lavender", iconColor:"text-primary" },
  { icon: Brain,     title: "Brain Assessment",      desc: "Take our 9-dimension aptitude test covering logic, creativity & personality.", color:"card-orange",  iconColor:"text-amber-600" },
  { icon: Target,    title: "Get Recommendations",  desc: "AI-powered stream, exam, and college recommendations tailored for you.", color:"card-mint",    iconColor:"text-secondary-dark" },
  { icon: Rocket,    title: "Plan Your Future",      desc: "Build parallel career paths, compare options & download your PDF report.", color:"card-pink",    iconColor:"text-rose-500" },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Dora parallax deco blobs */}
      <ParallaxLayer speed={0.2} className="absolute top-12 right-16 pointer-events-none">
        <div className="w-40 h-40 rounded-full opacity-10 blur-3xl bg-primary" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.4} className="absolute bottom-16 left-8 pointer-events-none">
        <div className="w-28 h-28 rounded-full opacity-10 blur-3xl bg-secondary" />
      </ParallaxLayer>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section header — reliable FadeUp ── */}
        <div className="text-center mb-16">
          <FadeUp delay={0}>
            <span className="badge badge-primary mb-4 inline-block">Simple process</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-poppins text-4xl md:text-5xl font-bold text-text mb-3 leading-tight">
              How It Works
            </h2>
          </FadeUp>
          <LineDrawReveal className="w-40 mx-auto mb-4" delay={0.3} />
          <FadeUp delay={0.2}>
            <p className="text-text-muted font-inter">Four simple steps from confusion to clarity</p>
          </FadeUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Animated gradient connector line — desktop */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[12.5%] right-[12.5%] h-px z-0"
            style={{ borderTop: "2px dashed #E9E4DC" }}>
            <motion.div
              style={{ height: "2px", marginTop: "-2px", transformOrigin: "left",
                background: "linear-gradient(90deg,#5B4FCF,#10B981)" }}
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
            />
          </div>

          {/* Each card — individual staggered entrance */}
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`${step.color} rounded-card border p-6 relative z-10 text-center`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.22, type: "spring", stiffness: 300 } }}
            >
              {/* Step number badge — spring pop */}
              <motion.div
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-border text-text font-poppins font-bold text-xs flex items-center justify-center shadow-sm"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.12 + 0.25 }}
              >
                {i + 1}
              </motion.div>

              <motion.div
                className="w-14 h-14 rounded-2xl bg-white mx-auto mb-4 mt-2 flex items-center justify-center shadow-sm"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.12 + 0.15 }}
              >
                <step.icon className={`w-7 h-7 ${step.iconColor}`} />
              </motion.div>
              <h3 className="font-poppins font-bold text-text text-base mb-2">{step.title}</h3>
              <p className="font-inter text-sm text-text-muted leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
