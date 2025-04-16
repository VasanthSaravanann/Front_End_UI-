"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface DynamicBackgroundProps {
  mood: 'neutral' | 'correct' | 'incorrect' | 'success';
  children: React.ReactNode;
}

export function DynamicBackground({ mood, children }: DynamicBackgroundProps) {
  const { theme } = useTheme();
  const [gradientColors, setGradientColors] = useState({
    from: 'from-blue-50',
    to: 'to-blue-100',
    darkFrom: 'dark:from-gray-900',
    darkTo: 'dark:to-gray-800',
  });

  useEffect(() => {
    switch (mood) {
      case 'correct':
        setGradientColors({
          from: 'from-green-50',
          to: 'to-emerald-100',
          darkFrom: 'dark:from-green-950',
          darkTo: 'dark:to-emerald-900',
        });
        break;
      case 'incorrect':
        setGradientColors({
          from: 'from-red-50',
          to: 'to-rose-100',
          darkFrom: 'dark:from-red-950',
          darkTo: 'dark:to-rose-900',
        });
        break;
      case 'success':
        setGradientColors({
          from: 'from-purple-50',
          to: 'to-indigo-100',
          darkFrom: 'dark:from-purple-950',
          darkTo: 'dark:to-indigo-900',
        });
        break;
      default:
        setGradientColors({
          from: 'from-blue-50',
          to: 'to-blue-100',
          darkFrom: 'dark:from-gray-900',
          darkTo: 'dark:to-gray-800',
        });
    }
  }, [mood]);

  return (
    <motion.div
      className={`min-h-screen bg-gradient-to-b ${gradientColors.from} ${gradientColors.to} ${gradientColors.darkFrom} ${gradientColors.darkTo}`}
      initial={false}
      animate={{
        background: theme === 'dark' 
          ? mood === 'correct' ? 'linear-gradient(to bottom, rgb(5, 46, 22), rgb(20, 83, 45))' 
            : mood === 'incorrect' ? 'linear-gradient(to bottom, rgb(69, 10, 10), rgb(127, 29, 29))'
            : mood === 'success' ? 'linear-gradient(to bottom, rgb(59, 7, 100), rgb(67, 20, 127))'
            : 'linear-gradient(to bottom, rgb(17, 24, 39), rgb(31, 41, 55))'
          : mood === 'correct' ? 'linear-gradient(to bottom, rgb(240, 253, 244), rgb(220, 252, 231))'
            : mood === 'incorrect' ? 'linear-gradient(to bottom, rgb(254, 242, 242), rgb(254, 226, 226))'
            : mood === 'success' ? 'linear-gradient(to bottom, rgb(250, 245, 255), rgb(238, 242, 255))'
            : 'linear-gradient(to bottom, rgb(248, 250, 252), rgb(241, 245, 249))'
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}