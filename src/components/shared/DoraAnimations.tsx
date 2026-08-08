"use client";

import {
  motion, useMotionValue, useSpring, useTransform, useScroll,
} from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";

/* ══════════════════════════════════════════════════════════
   1. SPLIT TEXT — word cascade (safe: opacity + y, not clip)
══════════════════════════════════════════════════════════════ */
export function SplitText({
  text, className = "", delay = 0, stagger = 0.06,
}: { text: string; className?: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.3em" }}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          className={className}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   2. CHAR SPLIT TEXT — character cascade
══════════════════════════════════════════════════════════════ */
export function SplitChars({
  text, className = "", delay = 0, stagger = 0.03,
}: { text: string; className?: string; delay?: number; stagger?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 18, rotateX: 40 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          className={className}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   3. FADE UP — simple reliable reveal (used for any block)
══════════════════════════════════════════════════════════════ */
export function FadeUp({
  children, delay = 0, className = "", distance = 32,
}: { children: ReactNode; delay?: number; className?: string; distance?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   4. MORPHING GRADIENT BG
══════════════════════════════════════════════════════════════ */
const STOPS = [
  "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(91,79,207,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(16,185,129,0.12) 0%, transparent 60%)",
  "radial-gradient(ellipse 70% 70% at 60% 20%, rgba(168,141,232,0.16) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 30% 80%, rgba(52,211,153,0.12) 0%, transparent 60%)",
  "radial-gradient(ellipse 90% 50% at 10% 60%, rgba(139,92,246,0.14) 0%, transparent 60%), radial-gradient(ellipse 60% 70% at 70% 30%, rgba(16,185,129,0.10) 0%, transparent 60%)",
];
export function MorphingGradientBg({ className = "" }: { className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI(n => (n + 1) % STOPS.length), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={{ background: STOPS[i] }}
      transition={{ duration: 3.5, ease: "easeInOut" }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   5. MAGNETIC BUTTON
══════════════════════════════════════════════════════════════ */
export function Magnetic({ children, strength = 0.4, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 18 });
  const y = useSpring(0, { stiffness: 180, damping: 18 });
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  return (
    <motion.div ref={ref} style={{ x, y }} onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={`inline-block ${className}`}>
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   6. CLIP-PATH WIPE REVEAL
══════════════════════════════════════════════════════════════ */
export function ClipReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   7. PARALLAX LAYER
══════════════════════════════════════════════════════════════ */
export function ParallaxLayer({ children, speed = 0.3, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [`${-speed * 60}px`, `${speed * 60}px`]),
    { stiffness: 60, damping: 18 }
  );
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

/* ══════════════════════════════════════════════════════════
   8. 3D FLIP CARD
══════════════════════════════════════════════════════════════ */
export function FlipCard({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, rotateX: 18, y: 36, scale: 0.94 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
      whileHover={{ scale: 1.03, y: -4, transition: { type: "spring", stiffness: 280, damping: 18 } }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformStyle: "preserve-3d", perspective: "900px" }}
    >
      {children}
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   9. CURSOR GLOW (client-only, mounted guard)
══════════════════════════════════════════════════════════════ */
export function CursorGlow() {
  const [mounted, setMounted] = useState(false);
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const sx = useSpring(mx, { stiffness: 80, damping: 22 });
  const sy = useSpring(my, { stiffness: 80, damping: 22 });

  useEffect(() => {
    setMounted(true);
    const move = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  const gx = useTransform(sx, v => v - 240);
  const gy = useTransform(sy, v => v - 240);

  if (!mounted) return null;
  return (
    <motion.div
      className="fixed pointer-events-none rounded-full"
      style={{
        zIndex: 9999, width: 480, height: 480, x: gx, y: gy,
        background: "radial-gradient(circle, rgba(91,79,207,0.10) 0%, transparent 70%)",
        filter: "blur(16px)",
      }}
    />
  );
}

/* ══════════════════════════════════════════════════════════
   10. DORA COUNTER — eased number roll
══════════════════════════════════════════════════════════════ */
export function DoraCounter({ to, suffix = "", duration = 2.2 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTriggered(true);
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!triggered) return;
    let frame = 0;
    const total = Math.round(duration * 60);
    const tick = () => {
      frame++;
      const eased = 1 - Math.pow(1 - frame / total, 3);
      setVal(Math.round(eased * to));
      if (frame < total) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [triggered, to, duration]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════
   11. GLITCH TEXT
══════════════════════════════════════════════════════════════ */
export function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const [on, setOn] = useState(false);
  return (
    <span
      className={`relative inline-block cursor-default ${className}`}
      onMouseEnter={() => { setOn(true); setTimeout(() => setOn(false), 380); }}
      style={{ isolation: "isolate" }}
    >
      {text}
      {on && (
        <>
          <span aria-hidden style={{ position: "absolute", inset: 0, color: "#ff005a", clipPath: "inset(15% 0 55% 0)", transform: "translateX(-4px)", opacity: 0.85 }}>{text}</span>
          <span aria-hidden style={{ position: "absolute", inset: 0, color: "#00e5ff", clipPath: "inset(50% 0 10% 0)", transform: "translateX(4px)", opacity: 0.85 }}>{text}</span>
        </>
      )}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════
   12. MORPH BLOB
══════════════════════════════════════════════════════════════ */
export function MorphBlob({ color = "rgba(91,79,207,0.12)", size = 400, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size }}
      animate={{ borderRadius: ["40% 60% 60% 40% / 40% 40% 60% 60%", "60% 40% 40% 60% / 60% 60% 40% 40%", "40% 60% 60% 40% / 40% 40% 60% 60%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-full h-full" style={{ background: color, filter: `blur(${size / 5}px)` }} />
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════
   13. SVG LINE DRAW
══════════════════════════════════════════════════════════════ */
export function LineDrawReveal({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 200 6" fill="none" style={{ width: "100%", display: "block" }}>
        <defs>
          <linearGradient id="lgr" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5B4FCF" /><stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0 3 Q50 1 100 3 T200 3"
          stroke="url(#lgr)" strokeWidth="3" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
    </div>
  );
}
