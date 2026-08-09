"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.();
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => setProgress((v.currentTime / (v.duration || 1)) * 100);
    const onEnded = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => { v.removeEventListener("timeupdate", onTime); v.removeEventListener("ended", onEnded); };
  }, []);

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  return (
    <section
      style={{ background: "#06040f", padding: "80px 0 100px" }}
      id="demo-video"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 18px", borderRadius: 999,
            border: "1px solid rgba(167,139,250,0.30)",
            background: "rgba(99,102,241,0.08)",
            color: "rgba(167,139,250,0.90)",
            fontSize: 13, fontFamily: "var(--font-dm-sans)",
            marginBottom: 18,
          }}>
            ▶ &nbsp;See it in action
          </span>
          <h2
            className="font-poppins font-bold"
            style={{
              fontSize: "clamp(1.7rem,3vw,2.5rem)",
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            Watch how EduPath AI works
          </h2>
          <p style={{ color: "rgba(255,255,255,0.42)", fontSize: 16, fontFamily: "var(--font-inter)", maxWidth: 500, margin: "0 auto" }}>
            A 2-minute walkthrough of the assessment, career matching, and college finder.
          </p>
        </motion.div>

        {/* Video card */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={toggle}
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            cursor: "pointer",
            /* glowing border */
            boxShadow: hovered
              ? "0 0 0 1.5px rgba(167,139,250,0.55), 0 0 60px rgba(99,102,241,0.35), 0 24px 80px rgba(0,0,0,0.6)"
              : "0 0 0 1px rgba(255,255,255,0.10), 0 24px 60px rgba(0,0,0,0.5)",
            transition: "box-shadow 0.4s ease",
            aspectRatio: "16/9",
            background: "#0a0818",
          }}
        >
          {/* Ambient glow behind video */}
          <motion.div
            style={{
              position: "absolute", inset: 0, zIndex: 0,
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(99,102,241,0.18) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── VIDEO ── */}
          <video
            ref={videoRef}
            src="/demo.mp4"
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", position: "relative", zIndex: 1 }}
          />

          {/* Overlay gradient (darkens when paused) */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: playing
              ? "linear-gradient(to top, rgba(6,4,15,0.55) 0%, transparent 45%)"
              : "linear-gradient(to top, rgba(6,4,15,0.75) 0%, rgba(6,4,15,0.25) 100%)",
            transition: "background 0.5s ease",
          }} />

          {/* Centre play button (visible when paused / hovered) */}
          <motion.div
            style={{
              position: "absolute", inset: 0, zIndex: 3,
              display: "flex", alignItems: "center", justifyContent: "center",
              pointerEvents: "none",
            }}
            animate={{ opacity: (!playing || hovered) ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid rgba(255,255,255,0.25)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
            >
              {playing
                ? <Pause  style={{ width: 26, height: 26, color: "#fff" }} />
                : <Play   style={{ width: 26, height: 26, color: "#fff", fill: "#fff", marginLeft: 3 }} />
              }
            </motion.div>
          </motion.div>

          {/* Bottom controls bar */}
          <motion.div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 4,
              padding: "12px 18px 16px",
              display: "flex", flexDirection: "column", gap: 8,
            }}
            animate={{ opacity: hovered || !playing ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Progress bar */}
            <div
              onClick={seek}
              style={{
                height: 4, background: "rgba(255,255,255,0.18)", borderRadius: 4,
                cursor: "pointer", position: "relative",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg,#a78bfa,#34d399)",
                borderRadius: 4,
                transition: "width 0.1s linear",
              }} />
            </div>

            {/* Buttons row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <button
                onClick={(e) => { e.stopPropagation(); toggle(); }}
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(255,255,255,0.85)" }}
              >
                {playing
                  ? <Pause  style={{ width: 18, height: 18 }} />
                  : <Play   style={{ width: 18, height: 18, fill: "currentColor" }} />}
              </button>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={toggleMute}    style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(255,255,255,0.75)" }}>
                  {muted ? <VolumeX style={{ width: 18, height: 18 }} /> : <Volume2 style={{ width: 18, height: 18 }} />}
                </button>
                <button onClick={openFullscreen} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "rgba(255,255,255,0.75)" }}>
                  <Maximize2 style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
