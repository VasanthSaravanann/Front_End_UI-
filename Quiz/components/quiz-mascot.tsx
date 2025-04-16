"use client";

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Brain, Star, Heart } from 'lucide-react';

interface QuizMascotProps {
  mood: 'neutral' | 'happy' | 'thinking' | 'celebrating';
  message?: string;
}

export function QuizMascot({ mood, message }: QuizMascotProps) {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    switch (mood) {
      case 'happy':
        controls.start({
          y: [0, -10, 0],
          transition: { duration: 0.5, repeat: 1 }
        });
        break;
      case 'thinking':
        controls.start({
          rotate: [0, -10, 10, -10, 0],
          transition: { duration: 1 }
        });
        break;
      case 'celebrating':
        controls.start({
          scale: [1, 1.2, 1],
          rotate: [0, 360],
          transition: { duration: 0.8 }
        });
        break;
    }
  }, [mood, controls]);

  const renderMascot = () => {
    switch (mood) {
      case 'happy':
        return <Heart className="w-8 h-8 text-pink-500" />;
      case 'thinking':
        return <Brain className="w-8 h-8 text-purple-500" />;
      case 'celebrating':
        return <Star className="w-8 h-8 text-yellow-500" />;
      default:
        return <Brain className="w-8 h-8 text-blue-500" />;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.div
        animate={controls}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="relative cursor-pointer"
      >
        <div className="bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg">
          {renderMascot()}
        </div>
        
        <AnimatePresence>
          {(isHovered || message) && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute bottom-full left-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg whitespace-nowrap"
            >
              <p className="text-sm">{message || "Need any help?"}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}