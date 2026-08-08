"use client";

import { motion } from "framer-motion";
import { Users, Building2, ThumbsUp, Award } from "lucide-react";
import { DoraCounter, SplitText } from "@/components/shared/DoraAnimations";

const stats = [
  { icon:Users,     label:"Students Guided",  to:10000, suffix:"+", color:"text-primary",       bg:"bg-primary-subtle" },
  { icon:Building2, label:"Colleges Listed",   to:500,   suffix:"+", color:"text-amber-600",     bg:"bg-accent-orange-bg" },
  { icon:ThumbsUp,  label:"Satisfaction Rate", to:95,    suffix:"%", color:"text-secondary-dark", bg:"bg-secondary-subtle" },
  { icon:Award,     label:"Expert Mentors",    to:120,   suffix:"+", color:"text-rose-500",      bg:"bg-accent-pink-bg" },
];

export default function StatsBar() {
  return (
    <section className="py-16 bg-white border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="text-center group"
              initial={{ opacity:0, y:24, filter:"blur(8px)" }}
              whileInView={{ opacity:1, y:0, filter:"blur(0px)" }}
              viewport={{ once:true }}
              transition={{ duration:0.55, delay:i*0.12, ease:[0.22,1,0.36,1] }}
            >
              <motion.div
                className={`w-14 h-14 ${s.bg} rounded-2xl mx-auto mb-3 flex items-center justify-center`}
                whileHover={{ scale:1.15, rotate:5 }}
                transition={{ type:"spring", stiffness:300, damping:15 }}
              >
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </motion.div>
              {/* Dora spring counter */}
              <div className={`font-poppins text-3xl font-bold ${s.color} mb-1`}>
                <DoraCounter to={s.to} suffix={s.suffix} duration={2.2} />
              </div>
              <p className="font-dmsans text-sm text-text-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
