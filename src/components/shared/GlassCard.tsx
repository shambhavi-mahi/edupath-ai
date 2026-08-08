"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode, useRef } from "react";
import { useMotionValue, useTransform, useSpring } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  tilt?: boolean;
  glowOnHover?: boolean;
}

export default function GlassCard({ children, className, hover = true, delay = 0, tilt = false, glowOnHover = false }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x   = useMotionValue(0);
  const y   = useMotionValue(0);
  const sc  = { stiffness:180, damping:22 };
  const rX  = useSpring(useTransform(y, [-0.5,0.5], [5,-5]), sc);
  const rY  = useSpring(useTransform(x, [-0.5,0.5], [-5,5]), sc);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width  - 0.5);
    y.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:24, scale:0.96 }}
      whileInView={{ opacity:1, y:0, scale:1 }}
      viewport={{ once:true, margin:"-50px" }}
      transition={{ duration:0.5, delay, ease:[0.25,0.1,0.25,1] }}
      style={tilt ? { rotateX:rX, rotateY:rY, transformStyle:"preserve-3d" } : {}}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={hover ? { y:-4, boxShadow:"0 8px 32px rgba(0,0,0,0.10)", transition:{ duration:0.2 } } : undefined}
      className={cn("edu-card p-6", className)}
    >
      {children}
    </motion.div>
  );
}
