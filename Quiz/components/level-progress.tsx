"use client";

import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

interface LevelProgressProps {
  level: number;
  xp: number;
}

export function LevelProgress({ level, xp }: LevelProgressProps) {
  const xpForNextLevel = level * 100;
  const progress = (xp % xpForNextLevel) / xpForNextLevel * 100;

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className="bg-yellow-500 text-white p-2 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Crown className="h-4 w-4" />
      </motion.div>
      <div className="flex flex-col">
        <span className="text-sm font-medium">Level {level}</span>
        <Progress value={progress} className="w-20 h-2" />
      </div>
    </div>
  );
}