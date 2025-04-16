"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { Button } from './ui/button';

interface SmartHintProps {
  question: string;
  timeSpent: number;
  difficulty: number;
  previousAttempts: number;
}

export function SmartHint({ question, timeSpent, difficulty, previousAttempts }: SmartHintProps) {
  const [showHint, setShowHint] = useState(false);
  const [hint, setHint] = useState('');

  useEffect(() => {
    const generateHint = () => {
      if (timeSpent > 20) {
        return "Remember to consider all options carefully.";
      }
      if (previousAttempts > 2) {
        return "Try approaching this from a different angle.";
      }
      if (difficulty > 7) {
        return "This is a challenging one - break it down step by step.";
      }
      return "You're doing great! Trust your instincts.";
    };

    setHint(generateHint());
  }, [timeSpent, difficulty, previousAttempts]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowHint(!showHint)}
        className="rounded-full"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>

      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-64 p-4 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
          >
            <p className="text-sm text-gray-600 dark:text-gray-300">{hint}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}