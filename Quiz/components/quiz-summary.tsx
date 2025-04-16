"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Trophy, Star, Award } from "lucide-react";

interface QuizSummaryProps {
  open: boolean;
  onClose: () => void;
  score: number;
  stats: {
    correct: number;
    incorrect: number;
    skipped: number;
  };
  level: number;
  xp: number;
}

export function QuizSummary({
  open,
  onClose,
  score,
  stats,
  level,
  xp,
}: QuizSummaryProps) {
  const totalQuestions = stats.correct + stats.incorrect + stats.skipped;
  const accuracy = totalQuestions > 0 ? (stats.correct / totalQuestions) * 100 : 0;
  const stars = Math.min(Math.floor(accuracy / 33) + 1, 3);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Quiz Complete!</DialogTitle>
        </DialogHeader>
        
        <div className="py-8">
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="relative"
            >
              <Trophy className="h-16 w-16 text-yellow-500" />
              <motion.div
                className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full px-2 py-1 text-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                {score}
              </motion.div>
            </motion.div>
          </div>

          <div className="flex justify-center gap-2 mb-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: i < stars ? 1 : 0.5, rotate: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <Star
                  className={`h-8 w-8 ${
                    i < stars ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill={i < stars ? "currentColor" : "none"}
                />
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Accuracy</span>
              <span className="font-bold">{accuracy.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Correct Answers</span>
              <span className="font-bold text-green-500">{stats.correct}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Level Reached</span>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="font-bold">{level}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>XP Gained</span>
              <span className="font-bold text-blue-500">+{xp}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}