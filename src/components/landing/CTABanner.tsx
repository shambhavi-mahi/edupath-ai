"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { FadeUp, Magnetic, MorphBlob, GlitchText, LineDrawReveal } from "@/components/shared/DoraAnimations";

const perks = ["Free forever plan", "No credit card needed", "Results in 2 minutes", "PDF report included"];

export default function CTABanner() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp delay={0} distance={24}>
          <div
            className="relative rounded-[32px] overflow-hidden text-center p-12 md:p-16"
            style={{ background: "linear-gradient(135deg, #5B4FCF 0%, #7C6FE0 50%, #A89DE8 100%)" }}
          >
            {/* Dora morphing blobs */}
            <MorphBlob color="rgba(255,255,255,0.07)" size={300} className="-top-20 -right-20" />
            <MorphBlob color="rgba(16,185,129,0.12)" size={200} className="-bottom-16 -left-16" />

            {/* Floating emoji decorations */}
            {["🚀","⭐","🧠","🎓"].map((e, i) => (
              <motion.span key={i} className="absolute text-3xl opacity-20 select-none"
                style={{ top: `${15 + i * 20}%`, left: i % 2 === 0 ? `${5 + i * 3}%` : undefined, right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined }}
                animate={{ y: [0, -12, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              >{e}</motion.span>
            ))}

            <div className="relative z-10">
              <FadeUp delay={0.1}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }} transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-white/15 border border-white/25 text-white/90 text-sm font-dmsans mb-6"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  Join 10,000+ students already on their path
                </motion.div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <h2 className="font-poppins text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  Ready to Find Your{" "}
                  {/* Glitch hover on key phrase */}
                  <GlitchText text="Perfect Career Path?" className="text-white" />
                </h2>
              </FadeUp>

              <LineDrawReveal className="w-56 mx-auto mb-6" delay={0.35} />

              <FadeUp delay={0.2}>
                <p className="font-inter text-white/65 text-lg mb-8 max-w-lg mx-auto">
                  Take our free brain assessment and get personalised recommendations today.
                </p>
              </FadeUp>

              <FadeUp delay={0.25}>
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  {perks.map(p => (
                    <span key={p} className="flex items-center gap-1.5 text-sm font-dmsans text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-secondary-light flex-shrink-0" />{p}
                    </span>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.3}>
                <Magnetic strength={0.4}>
                  <Link
                    href="/assessment"
                    className="inline-flex items-center gap-2 bg-white text-primary font-dmsans font-bold px-9 py-4 rounded-pill text-base hover:bg-cream transition-all hover:scale-105 shadow-lg"
                  >
                    Start Free Assessment <ArrowRight className="w-5 h-5" />
                  </Link>
                </Magnetic>
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
