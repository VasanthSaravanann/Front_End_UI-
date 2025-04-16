"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Reaction {
  id: number;
  emoji: string;
  x: number;
}

interface ReactionBarProps {
  onReaction?: (emoji: string) => void;
}

export function ReactionBar({ onReaction }: ReactionBarProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const emojis = ["👍", "❤️", "😂", "🎉", "🤔", "👏"];

  const addReaction = (emoji: string) => {
    const newReaction: Reaction = {
      id: Date.now(),
      emoji,
      x: Math.random() * 100,
    };
    setReactions(prev => [...prev, newReaction]);
    onReaction?.(emoji);

    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end">
      <div className="h-40 overflow-hidden relative w-20">
        <AnimatePresence>
          {reactions.map(reaction => (
            <motion.div
              key={reaction.id}
              className="absolute"
              initial={{ y: 100, x: reaction.x, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {reaction.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex gap-1 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
        {emojis.map(emoji => (
          <motion.button
            key={emoji}
            className="text-xl hover:scale-125 transition-transform"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => addReaction(emoji)}
          >
            {emoji}
          </motion.button>
        ))}
      </div>
    </div>
  );
}