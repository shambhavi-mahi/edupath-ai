"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, FlaskConical, University, Search, RefreshCw, GraduationCap, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const stages = [
  { icon:BookOpen,     title:"Class 9–10",    desc:"Pre-stream selection guidance",    href:"/assessment?stage=class-9-10",     color:"card-lavender", emoji:"📚", rating:"4.9", students:"3,200+" },
  { icon:FlaskConical, title:"Class 11–12",   desc:"Entrance exam preparation",        href:"/assessment?stage=class-11-12",    color:"card-mint",    emoji:"⚗️", rating:"4.8", students:"5,400+" },
  { icon:University,   title:"Undergraduate", desc:"College & parallel career paths",  href:"/assessment?stage=undergraduate",  color:"card-orange",  emoji:"🏛️", rating:"4.9", students:"2,800+" },
  { icon:GraduationCap,title:"Postgraduate",  desc:"CAT, GATE, UPSC & higher studies",href:"/assessment?stage=postgraduate",   color:"card-pink",    emoji:"🎓", rating:"4.7", students:"1,200+" },
  { icon:Search,       title:"Job Seeker",    desc:"Fresh graduate job matching",      href:"/assessment?stage=job-seeker",     color:"card-sky",     emoji:"🔍", rating:"4.8", students:"4,100+" },
  { icon:RefreshCw,    title:"Career Switcher",desc:"Transition roadmap & upskilling", href:"/assessment?stage=career-switcher",color:"card-peach",   emoji:"🔄", rating:"4.9", students:"1,800+" },
];

const container = { hidden:{}, visible:{ transition:{ staggerChildren:0.09 } } };
const cardAnim  = { hidden:{opacity:0,scale:0.88,y:16}, visible:{opacity:1,scale:1,y:0, transition:{duration:0.48,ease:[0.25,0.1,0.25,1]}} };

export default function WhoIsThisFor() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" className="text-center mb-16">
          <span className="badge badge-primary mb-4">For everyone</span>
          <h2 className="section-heading center-heading inline-block">Who Is This For?</h2>
          <p className="text-text-muted font-inter mt-4">Personalised flows for every stage of your journey</p>
        </ScrollReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once:true, margin:"-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {stages.map((s, i) => (
            <motion.div key={i} variants={cardAnim}>
              <Link href={s.href} className="block h-full group">
                <div className={`${s.color} rounded-card border p-5 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{s.emoji}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">⭐</span>
                      <span className="text-xs font-dmsans font-semibold text-text">{s.rating}</span>
                    </div>
                  </div>
                  <h3 className="font-poppins font-bold text-text text-lg mb-1">{s.title}</h3>
                  <p className="font-inter text-sm text-text-muted mb-4">{s.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-dmsans text-text-muted">{s.students} students</span>
                    <span className="flex items-center gap-1 text-xs font-dmsans font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Start <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
