"use client";

import Link from "next/link";
import {
  motion, AnimatePresence, useMotionValue, useSpring, useTransform,
} from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { MorphingGradientBg, Magnetic, CursorGlow } from "@/components/shared/DoraAnimations";

/* ─── Floating info cards ─── */
const CARDS = [
  { emoji:"🧠", label:"Brain Score",  value:"92%",   sub:"Logical Reasoning",  top:"10%", left:"2%",   delay:0   },
  { emoji:"🎓", label:"IIT Bombay",   value:"Match!", sub:"92% compatibility",  top:"8%",  right:"2%",  delay:0.5 },
  { emoji:"📈", label:"Career Paths", value:"3",      sub:"Parallel routes",    top:"52%", left:"0%",   delay:1.0 },
  { emoji:"⭐", label:"Top 10%",      value:"Rank",   sub:"JEE aspirants 2024", top:"52%", right:"0%",  delay:1.5 },
  { emoji:"✅", label:"Stream",       value:"PCM",    sub:"Science recommended", bottom:"6%", left:"50%", delay:0.8 },
];

/* ─── Orbit ring ─── */
function OrbitRing({ r, duration, color }: { r:number; duration:number; color:string }) {
  return (
    <motion.div
      style={{
        position:"absolute",
        width: r*2, height: r*2,
        top:"50%", left:"50%",
        marginTop: -r, marginLeft: -r,
        borderRadius:"50%",
        border:`1px solid ${color}`,
      }}
      animate={{ rotate:360 }}
      transition={{ duration, repeat:Infinity, ease:"linear" }}
    >
      <div style={{
        position:"absolute", width:9, height:9,
        top:-4.5, left:"50%", marginLeft:-4.5,
        borderRadius:"50%", background:color,
        boxShadow:`0 0 14px ${color}`,
      }} />
    </motion.div>
  );
}

/* ─── Animated student background (CSS canvas, no video needed) ─── */
function StudentBackground() {
  /* floating educational icons */
  const icons = ["📚","🔬","📐","✏️","🖥️","📝","🧪","🎒","📊","🔭","📖","💡","🧮","🏆","📌"];
  const positions = [
    {top:"8%",  left:"6%",  size:28, dur:7,  del:0   },
    {top:"15%", left:"80%", size:24, dur:9,  del:1   },
    {top:"30%", left:"92%", size:22, dur:8,  del:2   },
    {top:"55%", left:"88%", size:26, dur:10, del:0.5 },
    {top:"70%", left:"4%",  size:20, dur:6,  del:1.5 },
    {top:"85%", left:"75%", size:24, dur:11, del:3   },
    {top:"88%", left:"20%", size:22, dur:8,  del:2.5 },
    {top:"40%", left:"5%",  size:20, dur:9,  del:0.8 },
    {top:"25%", left:"48%", size:18, dur:12, del:4   },
    {top:"72%", left:"55%", size:22, dur:7,  del:1.2 },
  ];
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
      {positions.map((p, i) => (
        <motion.div key={i}
          style={{
            position:"absolute", top:p.top, left:p.left,
            fontSize:p.size, opacity:0.07, userSelect:"none",
          }}
          animate={{ y:[0,-18,0], rotate:[0,8,-8,0], opacity:[0.05,0.12,0.05] }}
          transition={{ duration:p.dur, repeat:Infinity, ease:"easeInOut", delay:p.del }}
        >
          {icons[i % icons.length]}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  /* mouse-reactive 3D tilt */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5,0.5], [10,-10]), { stiffness:50, damping:16 });
  const rotateY = useSpring(useTransform(mx, [-0.5,0.5], [-14,14]), { stiffness:50, damping:16 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth  - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  const stagger  = { hidden:{}, visible:{ transition:{ staggerChildren:0.12, delayChildren:0.1 } } };
  const fadeItem = { hidden:{ opacity:0, y:28 }, visible:{ opacity:1, y:0, transition:{ duration:0.65, ease:[0.22,1,0.36,1] } } };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background:"#06040f" }}>

      {mounted && <CursorGlow />}

      {/* ══ Rich CSS background — student-themed ══ */}
      <div style={{ position:"absolute", inset:0, zIndex:0, overflow:"hidden" }}>
        {/* Main radial gradients — warm study-room palette */}
        <div style={{
          position:"absolute", inset:0,
          background:`
            radial-gradient(ellipse 80% 70% at 15% 20%, rgba(99,102,241,0.28) 0%, transparent 60%),
            radial-gradient(ellipse 60% 60% at 80% 80%, rgba(16,185,129,0.18) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 60% 10%, rgba(245,158,11,0.12) 0%, transparent 50%),
            radial-gradient(ellipse 40% 40% at 90% 30%, rgba(236,72,153,0.10) 0%, transparent 50%),
            linear-gradient(160deg, #0a0818 0%, #060b1a 40%, #060f12 100%)
          `,
        }} />

        {/* Animated warm glow that breathes */}
        <motion.div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse 70% 50% at 30% 50%, rgba(99,102,241,0.12) 0%, transparent 60%)",
        }}
          animate={{ opacity:[0.5,1,0.5] }}
          transition={{ duration:5, repeat:Infinity, ease:"easeInOut" }}
        />

        {/* Grid lines — subtle educational graph-paper feel */}
        <div style={{
          position:"absolute", inset:0, opacity:0.035,
          backgroundImage:`
            linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
          `,
          backgroundSize:"60px 60px",
        }} />

        {/* Floating subject icons */}
        <StudentBackground />

        {/* Morphing colour overlay */}
        <MorphingGradientBg />

        {/* Vignette */}
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(6,4,15,0.75) 100%)",
        }} />
        {/* Bottom fade */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, height:160,
          background:"linear-gradient(to bottom, transparent, #06040f)",
        }} />
      </div>

      {/* Floating particles */}
      {mounted && (
        <div style={{ position:"absolute", inset:0, pointerEvents:"none", zIndex:1, overflow:"hidden" }}>
          {Array.from({length:22}).map((_,i) => (
            <motion.div key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random()*2.5+0.8,
                height: Math.random()*2.5+0.8,
                left:`${Math.random()*100}%`,
                top:`${Math.random()*100}%`,
              }}
              animate={{ opacity:[0,0.3,0], y:[0,-45] }}
              transition={{ duration:Math.random()*5+5, repeat:Infinity, delay:Math.random()*6, ease:"easeOut" }}
            />
          ))}
        </div>
      )}

      {/* ══ Main content ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-80px)] py-20">

          {/* LEFT — Text */}
          <motion.div variants={stagger} initial="hidden" animate="visible">

            {/* Badge */}
            <motion.div variants={fadeItem} className="mb-7">
              <span style={{
                display:"inline-flex", alignItems:"center", gap:8,
                padding:"7px 18px", borderRadius:999,
                border:"1px solid rgba(255,255,255,0.14)",
                background:"rgba(255,255,255,0.06)",
                backdropFilter:"blur(12px)",
                color:"rgba(255,255,255,0.78)",
                fontSize:13, fontFamily:"var(--font-dm-sans)",
              }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:"#34d399",
                  boxShadow:"0 0 8px #34d399", animation:"pulse 1.5s infinite" }} />
                The best AI career companion for Indian students
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeItem}>
              <h1 className="font-poppins font-bold leading-[1.09] tracking-tight mb-6"
                style={{ fontSize:"clamp(2.6rem,4.5vw,3.9rem)", color:"rgba(255,255,255,0.96)" }}>
                Find your
                <br />
                <span style={{
                  background:"linear-gradient(90deg,#a78bfa 0%,#34d399 45%,#a78bfa 100%)",
                  backgroundSize:"200% auto",
                  WebkitBackgroundClip:"text",
                  WebkitTextFillColor:"transparent",
                  backgroundClip:"text",
                  animation:"shimmerText 4s linear infinite",
                }}>
                  perfect career path
                </span>
                <br />
                <span style={{ color:"rgba(255,255,255,0.82)" }}>after Class 10</span>
              </h1>
            </motion.div>

            {/* Sub */}
            <motion.div variants={fadeItem}>
              <p className="font-inter text-lg leading-relaxed mb-10 max-w-[430px]"
                style={{ color:"rgba(255,255,255,0.50)" }}>
                For students of Class 8, 9, 10 & college — AI-powered brain assessment,
                stream selection, exam guidance, and college finder. All in one place.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeItem} style={{ display:"flex", flexWrap:"wrap", gap:14, alignItems:"center", marginBottom:48 }}>
              <Magnetic strength={0.35}>
                <Link href="/assessment" style={{
                  display:"inline-flex", alignItems:"center", gap:8,
                  padding:"14px 32px", borderRadius:999,
                  background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
                  boxShadow:"0 0 32px rgba(99,102,241,0.55),0 4px 20px rgba(0,0,0,0.3)",
                  color:"#fff", fontFamily:"var(--font-dm-sans)", fontWeight:600, fontSize:15,
                  textDecoration:"none", whiteSpace:"nowrap",
                }}>
                  Start Free Assessment <ArrowRight style={{ width:16,height:16 }} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent("open-pathbot"))}
                  style={{
                    display:"inline-flex", alignItems:"center", gap:10,
                    padding:"14px 22px", borderRadius:999,
                    border:"1px solid rgba(255,255,255,0.14)",
                    background:"rgba(255,255,255,0.04)",
                    backdropFilter:"blur(8px)",
                    color:"rgba(255,255,255,0.70)",
                    fontFamily:"var(--font-dm-sans)", fontWeight:500, fontSize:15,
                    cursor:"pointer", whiteSpace:"nowrap",
                  }}>
                  <span style={{
                    width:30,height:30,borderRadius:"50%",
                    background:"rgba(255,255,255,0.10)",
                    display:"flex",alignItems:"center",justifyContent:"center",
                  }}>
                    <Play style={{ width:11,height:11,fill:"white",color:"white" }} />
                  </span>
                  Watch Demo
                </button>
              </Magnetic>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeItem} style={{ display:"flex", alignItems:"center", gap:18 }}>
              <div style={{ display:"flex" }}>
                {["#a78bfa","#34d399","#f9a8c9","#fbbf24"].map((c,i) => (
                  <div key={i} style={{
                    width:36,height:36,borderRadius:"50%",
                    border:"2px solid rgba(255,255,255,0.18)",
                    background:c, display:"flex", alignItems:"center", justifyContent:"center",
                    color:"#fff", fontSize:11, fontWeight:700,
                    marginLeft:i===0?0:-10, position:"relative", zIndex:4-i,
                  }}>
                    {["P","A","S","R"][i]}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ display:"flex",gap:2,marginBottom:3 }}>
                  {[...Array(5)].map((_,i) => <Star key={i} style={{ width:13,height:13,fill:"#facc15",color:"#facc15" }} />)}
                </div>
                <p style={{ fontSize:12,fontFamily:"var(--font-dm-sans)",color:"rgba(255,255,255,0.40)" }}>
                  <span style={{ fontWeight:700,color:"rgba(255,255,255,0.80)" }}>10,000+</span> students guided
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — dora.run 3D scene */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            style={{ height:520 }}
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ duration:1, delay:0.5 }}
          >
            <motion.div
              style={{ position:"relative", width:"100%", height:"100%",
                rotateX, rotateY, transformStyle:"preserve-3d", perspective:"1000px" }}
            >
              {/* Orbit rings */}
              <OrbitRing r={148} duration={18} color="rgba(167,139,250,0.30)" />
              <OrbitRing r={208} duration={28} color="rgba(52,211,153,0.22)"  />
              <OrbitRing r={268} duration={42} color="rgba(249,168,201,0.16)" />

              {/* Central glowing sphere */}
              <div style={{ position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)" }}>
                {/* Outer glow */}
                <motion.div style={{
                  position:"absolute", width:210,height:210, left:-105,top:-105,
                  borderRadius:"50%",
                  background:"radial-gradient(circle,rgba(99,102,241,0.32) 0%,transparent 70%)",
                  filter:"blur(22px)",
                }}
                  animate={{ scale:[1,1.28,1], opacity:[0.55,1,0.55] }}
                  transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
                />
                {/* Sphere */}
                <motion.div style={{
                  position:"relative", width:118,height:118, left:-59,top:-59,
                  borderRadius:"50%",
                  background:"radial-gradient(circle at 35% 30%, rgba(196,181,253,0.95) 0%, rgba(99,102,241,0.9) 45%, rgba(67,56,202,1) 100%)",
                  boxShadow:"0 0 55px rgba(99,102,241,0.65),0 0 100px rgba(99,102,241,0.25),inset 0 0 30px rgba(255,255,255,0.12)",
                  display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,
                }}
                  animate={{ rotateY:360 }}
                  transition={{ duration:14, repeat:Infinity, ease:"linear" }}
                >
                  🎓
                </motion.div>
                {/* Pulse rings */}
                {[1.45,2.0,2.6].map((s,i) => (
                  <motion.div key={i} style={{
                    position:"absolute", width:118,height:118, left:-59,top:-59,
                    borderRadius:"50%", border:"1.5px solid rgba(167,139,250,0.35)",
                  }}
                    animate={{ scale:[s,s+0.55], opacity:[0.45,0] }}
                    transition={{ duration:2.6, repeat:Infinity, ease:"easeOut", delay:i*0.88 }}
                  />
                ))}
              </div>

              {/* Floating info cards */}
              {CARDS.map((card, i) => (
                <motion.div key={i}
                  style={{
                    position:"absolute",
                    ...(card.top    ? { top:card.top }       : {}),
                    ...(card.bottom ? { bottom:card.bottom } : {}),
                    ...(card.left   ? { left:card.left }     : {}),
                    ...(card.right  ? { right:card.right }   : {}),
                    zIndex:20,
                  }}
                  initial={{ opacity:0, scale:0.6 }}
                  animate={{ opacity:1, scale:1, y:[0,-9,0] }}
                  transition={{
                    opacity:{ duration:0.6, delay:card.delay+0.8 },
                    scale:  { duration:0.6, delay:card.delay+0.8, type:"spring", stiffness:200 },
                    y:      { duration:4.5+i*0.4, repeat:Infinity, ease:"easeInOut", delay:card.delay },
                  }}
                  whileHover={{ scale:1.09, transition:{ type:"spring", stiffness:300 } }}
                >
                  <div style={{
                    background:"rgba(255,255,255,0.07)",
                    backdropFilter:"blur(20px)",
                    border:"1px solid rgba(255,255,255,0.13)",
                    borderRadius:16,
                    padding:"10px 16px",
                    minWidth:150,
                    boxShadow:"0 8px 32px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.12)",
                    display:"flex", alignItems:"center", gap:10,
                  }}>
                    <span style={{ fontSize:22 }}>{card.emoji}</span>
                    <div>
                      <div style={{ display:"flex",alignItems:"baseline",gap:5 }}>
                        <span style={{ color:"rgba(255,255,255,0.92)",fontFamily:"var(--font-poppins)",fontWeight:700,fontSize:13 }}>{card.value}</span>
                        <span style={{ color:"rgba(255,255,255,0.42)",fontFamily:"var(--font-dm-sans)",fontSize:10 }}>{card.label}</span>
                      </div>
                      <p style={{ color:"rgba(255,255,255,0.35)",fontFamily:"var(--font-dm-sans)",fontSize:9,marginTop:2 }}>{card.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom blend */}
      <div style={{ position:"absolute",bottom:0,left:0,right:0,height:80,zIndex:10,
        background:"linear-gradient(to bottom,transparent,#06040f)" }} />

      <style>{`
        @keyframes shimmerText {
          0%   { background-position: 0%   center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </section>
  );
}
