"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number;
  label?: string;
  showPercentage?: boolean;
}

export default function ProgressBar({ progress, label, showPercentage = true }: ProgressBarProps) {
  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between mb-2">
          {label && <span className="font-dmsans text-sm text-text-muted dark:text-gray-400">{label}</span>}
          {showPercentage && (
            <span className="font-dmsans text-sm font-semibold text-primary">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      <div className="h-3 bg-primary/20 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
