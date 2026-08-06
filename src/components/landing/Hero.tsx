"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero dark:bg-hero-dark">
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: 60 + i * 30,
              height: 60 + i * 30,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute w-32 h-32 border-2 border-white/20 rounded-2xl"
          style={{ right: "15%", top: "30%" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-20 h-20 bg-secondary/20 rounded-full"
          style={{ left: "5%", bottom: "20%" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-outfit text-white/80 text-lg mb-4"
        >
          Your AI-Powered Career Compass for India
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-poppins text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Discover Your Perfect
          <br />
          <span className="text-secondary">Career Path</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-inter text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Brain assessment, stream guidance, entrance exam prep, college recommendations,
          and career planning — all personalised for your stage in life.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/assessment" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
            Start Assessment <ArrowRight className="w-5 h-5" />
          </Link>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-pathbot"))}
            className="btn-outline-white inline-flex items-center justify-center gap-2 text-lg"
          >
            <MessageCircle className="w-5 h-5" /> Chat with PathBot
          </button>
        </motion.div>
      </div>
    </section>
  );
}
