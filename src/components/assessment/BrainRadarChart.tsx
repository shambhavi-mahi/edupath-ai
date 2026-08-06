"use client";

import { motion } from "framer-motion";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";

interface BrainRadarChartProps {
  data: { dimension: string; score: number }[];
  animated?: boolean;
}

export default function BrainRadarChart({ data, animated = true }: BrainRadarChartProps) {
  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.8 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full h-[350px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#A5B4FC" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "#6B7280", fontSize: 11, fontFamily: "Inter" }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#6B7280", fontSize: 10 }} />
          <Radar
            name="Score"
            dataKey="score"
            stroke="#4338CA"
            fill="#4338CA"
            fillOpacity={0.3}
            strokeWidth={2}
            animationDuration={animated ? 1500 : 0}
          />
          <Tooltip
            contentStyle={{
              background: "#F5F3FF",
              border: "1px solid #A5B4FC",
              borderRadius: "8px",
              fontFamily: "Inter",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
