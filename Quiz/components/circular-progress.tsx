"use client";

import { motion } from "framer-motion";

interface CircularProgressProps {
  progress: number;
  duration: number;
}

export function CircularProgress({ progress, duration }: CircularProgressProps) {
  const circumference = 2 * Math.PI * 45; // radius = 45

  return (
    <div className="relative w-16 h-16">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-muted stroke-current"
          strokeWidth="10"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <motion.circle
          className="text-primary stroke-current"
          strokeWidth="10"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray: circumference,
            pathLength: 1,
          }}
          animate={{
            pathLength: progress,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold">
        {Math.round(duration * progress)}
      </div>
    </div>
  );
}