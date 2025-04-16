"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

interface ShuffleAnimationProps {
  items: React.ReactNode[];
  onShuffle?: () => void;
}

export function ShuffleAnimation({ items, onShuffle }: ShuffleAnimationProps) {
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    setPositions([...Array(items.length)].map((_, i) => i));
  }, [items.length]);

  const shuffle = () => {
    const newPositions = [...positions];
    for (let i = newPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newPositions[i], newPositions[j]] = [newPositions[j], newPositions[i]];
    }
    setPositions(newPositions);
    onShuffle?.();
  };

  return (
    <div className="relative h-[400px]">
      <AnimatePresence>
        {positions.map((position, index) => (
          <motion.div
            key={position}
            className="absolute w-full"
            initial={false}
            animate={{
              zIndex: index,
              x: Math.sin(position * 0.3) * 20,
              y: position * 4,
              rotate: Math.sin(position * 0.5) * 5,
              scale: 1 - position * 0.05,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            whileHover={{ scale: 1.02, rotate: 0 }}
            onClick={shuffle}
          >
            <Card className="p-6 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 cursor-pointer">
              {items[position]}
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}