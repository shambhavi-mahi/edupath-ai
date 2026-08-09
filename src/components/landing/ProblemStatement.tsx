"use client";

import { motion } from "framer-motion";

const highlights = [
  { icon: "🎯", text: "Individual strengths & aptitude" },
  { icon: "📚", text: "Academic performance & goals" },
  { icon: "🧠", text: "Machine learning–powered matching" },
  { icon: "🗺️", text: "Actionable education roadmaps" },
];

export default function ProblemStatement() {
  return (
    <section
      style={{
        background: "#06040f",
        padding: "72px 0 64px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* subtle background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(167,139,250,0.35), rgba(52,211,153,0.25), transparent)",
            marginBottom: 52,
            transformOrigin: "left",
          }}
        />

        {/* label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          style={{ textAlign: "center", marginBottom: 28 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 16px", borderRadius: 999,
            border: "1px solid rgba(167,139,250,0.28)",
            background: "rgba(99,102,241,0.07)",
            color: "rgba(167,139,250,0.85)",
            fontSize: 12, fontFamily: "var(--font-dm-sans)", letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}>
            The Problem We Solve
          </span>
        </motion.div>

        {/* problem text */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
          style={{
            textAlign: "center",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.52)",
            fontFamily: "var(--font-inter)",
            maxWidth: 680,
            margin: "0 auto 20px",
          }}
        >
          Students often struggle to choose the right academic stream, career direction,
          entrance exams, and skills because{" "}
          <span style={{ color: "rgba(255,255,255,0.82)", fontWeight: 500 }}>
            existing guidance is generic
          </span>{" "}
          and doesn&apos;t sufficiently consider their individual strengths, interests,
          aptitude, academic performance, and goals.
        </motion.p>

        {/* solution text */}
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.2 }}
          style={{
            textAlign: "center",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            lineHeight: 1.85,
            fontFamily: "var(--font-inter)",
            maxWidth: 680,
            margin: "0 auto 52px",
            background: "linear-gradient(90deg, #a78bfa 0%, #34d399 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
          }}
        >
          EduPath uses student assessment data, machine learning, and a career
          knowledge base to provide personalized career exploration and actionable
          education roadmaps.
        </motion.p>

        {/* highlight chips */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: "flex", flexWrap: "wrap", gap: 14,
            justifyContent: "center",
          }}
        >
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, borderColor: "rgba(167,139,250,0.5)" }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "10px 20px", borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(10px)",
                color: "rgba(255,255,255,0.72)",
                fontFamily: "var(--font-dm-sans)", fontSize: 14,
                cursor: "default",
              }}
            >
              <span style={{ fontSize: 18 }}>{h.icon}</span>
              {h.text}
            </motion.div>
          ))}
        </motion.div>

        {/* bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: 1,
            background: "linear-gradient(90deg, transparent, rgba(52,211,153,0.25), rgba(167,139,250,0.35), transparent)",
            marginTop: 52,
            transformOrigin: "right",
          }}
        />
      </div>
    </section>
  );
}
