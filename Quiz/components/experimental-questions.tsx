"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExperimentalQuestionProps {
  type: 'slider' | 'color' | 'emoji';
  question: string;
  correctAnswer: number | string;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  onAnswer: (isCorrect: boolean) => void;
}

export function ExperimentalQuestion({
  type,
  question,
  correctAnswer,
  min = 0,
  max = 100,
  step = 1,
  options,
  onAnswer,
}: ExperimentalQuestionProps) {
  const [value, setValue] = useState(min);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = () => {
    let isCorrect = false;
    switch (type) {
      case 'slider':
        isCorrect = value === correctAnswer;
        break;
      case 'color':
        isCorrect = selectedColor === correctAnswer;
        break;
      case 'emoji':
        isCorrect = selectedEmoji === correctAnswer;
        break;
    }
    setHasSubmitted(true);
    onAnswer(isCorrect);
  };

  return (
    <Card className="p-6 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80">
      <h2 className="text-xl font-semibold mb-6">{question}</h2>

      {type === 'slider' && (
        <div className="space-y-6">
          <Slider
            value={[value]}
            min={min}
            max={max}
            step={step}
            onValueChange={([val]) => setValue(val)}
            className="w-full"
          />
          <div className="text-center text-2xl font-bold">{value}</div>
        </div>
      )}

      {type === 'color' && (
        <div className="grid grid-cols-3 gap-4">
          {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map((color) => (
            <motion.div
              key={color}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "h-20 rounded-lg cursor-pointer",
                selectedColor === color ? "ring-4 ring-primary" : ""
              )}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      )}

      {type === 'emoji' && (
        <div className="grid grid-cols-4 gap-4">
          {['😀', '😍', '🤔', '😎', '🥳', '😴', '🤓', '🤯'].map((emoji) => (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "text-4xl p-4 rounded-lg",
                selectedEmoji === emoji ? "bg-primary/20" : "hover:bg-primary/10"
              )}
              onClick={() => setSelectedEmoji(emoji)}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      )}

      {!hasSubmitted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6"
        >
          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
          >
            Submit Answer
          </Button>
        </motion.div>
      )}
    </Card>
  );
}