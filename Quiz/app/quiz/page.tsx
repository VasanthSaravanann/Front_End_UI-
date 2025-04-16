"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Timer, CheckCircle, XCircle, Volume2, VolumeX, Settings, Globe, Crown, Keyboard } from "lucide-react";
import { CircularProgress } from "@/components/circular-progress";
import { DragAndDropQuestion } from "@/components/drag-and-drop-question";
import { ScoreChart } from "@/components/score-chart";
import { SettingsPanel } from "@/components/settings-panel";
import { LevelProgress } from "@/components/level-progress";
import { QuizSummary } from "@/components/quiz-summary";
import { ExperimentalQuestion } from "@/components/experimental-questions";
import { DynamicBackground } from "@/components/dynamic-background";
import { ShuffleAnimation } from "@/components/shuffle-animation";
import { ReactionBar } from "@/components/reaction-bar";
import confetti from 'canvas-confetti';
import useSound from 'use-sound';
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  type: 'multiple-choice' | 'drag-and-drop' | 'image' | 'slider' | 'color' | 'emoji';
  question: string;
  options?: string[];
  items?: string[];
  correctAnswer?: number | string;
  correctOrder?: number[];
  imageUrl?: string;
  min?: number;
  max?: number;
  step?: number;
  language?: {
    en: string;
    es: string;
    fr: string;
  };
}

const questions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: "What is the capital of France?",
    language: {
      en: "What is the capital of France?",
      es: "¿Cuál es la capital de Francia?",
      fr: "Quelle est la capitale de la France?"
    },
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    type: 'slider',
    question: "What is the temperature of boiling water in Celsius?",
    min: 0,
    max: 200,
    step: 1,
    correctAnswer: 100,
  },
  {
    id: 3,
    type: 'color',
    question: "Select the color that represents danger",
    correctAnswer: "#FF0000",
  },
  {
    id: 4,
    type: 'emoji',
    question: "Which emoji best represents happiness?",
    correctAnswer: "😀",
  },
  {
    id: 5,
    type: 'drag-and-drop',
    question: "Order these planets from closest to farthest from the Sun",
    items: ["Mercury", "Venus", "Earth", "Mars"],
    correctOrder: [0, 1, 2, 3],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [showSettings, setShowSettings] = useState(false);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0, skipped: 0 });
  const [mood, setMood] = useState<'neutral' | 'correct' | 'incorrect' | 'success'>('neutral');
  
  const { toast } = useToast();
  const [playCorrect] = useSound('/sounds/correct.mp3', { soundEnabled });
  const [playWrong] = useSound('/sounds/wrong.mp3', { soundEnabled });

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (showFeedback) return;
    
    const keyToIndex = {
      'a': 0,
      'b': 1,
      'c': 2,
      'd': 3,
    };

    const index = keyToIndex[event.key.toLowerCase()];
    if (index !== undefined && questions[currentQuestion].type === 'multiple-choice') {
      handleAnswer(index);
      if (window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  }, [currentQuestion, showFeedback]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      handleTimeout();
    }
  }, [timeLeft, showFeedback]);

  const handleTimeout = () => {
    setShowFeedback(true);
    setStreak(0);
    setStats(prev => ({ ...prev, skipped: prev.skipped + 1 }));
    setMood('incorrect');
    playWrong();

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        endQuiz();
      }
    }, 1500);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleAnswer = (optionIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(optionIndex);
    setShowFeedback(true);
    
    const isCorrect = optionIndex === questions[currentQuestion].correctAnswer;
    handleAnswerFeedback(isCorrect);
  };

  const handleDragAndDropAnswer = (isCorrect: boolean) => {
    handleAnswerFeedback(isCorrect);
  };

  const handleExperimentalAnswer = (isCorrect: boolean) => {
    handleAnswerFeedback(isCorrect);
  };

  const handleAnswerFeedback = (isCorrect: boolean) => {
    if (isCorrect) {
      const newScore = score + Math.max(10, timeLeft);
      setScore(newScore);
      setStreak(streak + 1);
      setStats(prev => ({ ...prev, correct: prev.correct + 1 }));
      setXp(prev => prev + 50);
      setMood('correct');
      playCorrect();
      if (streak >= 2) triggerConfetti();
      
      if (xp + 50 >= level * 100) {
        setLevel(prev => prev + 1);
        setMood('success');
        toast({
          title: "Level Up!",
          description: `Congratulations! You've reached level ${level + 1}!`,
        });
      }
    } else {
      setStreak(0);
      setStats(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setMood('incorrect');
      playWrong();
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        nextQuestion();
      } else {
        endQuiz();
      }
    }, 1500);
  };

  const nextQuestion = () => {
    setCurrentQuestion(prev => prev + 1);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setTimeLeft(30);
    setMood('neutral');
  };

  const endQuiz = () => {
    setShowSummary(true);
    setMood('success');
  };

  const currentQuestionData = questions[currentQuestion];
  const questionText = currentQuestionData.language?.[language] || currentQuestionData.question;

  const renderQuestionContent = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="grid gap-4">
            {question.options?.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={selectedAnswer === index ? 
                    (index === question.correctAnswer ? "success" : "destructive") 
                    : "outline"}
                  className="relative text-left h-auto py-4 px-6 w-full"
                  onClick={() => handleAnswer(index)}
                  disabled={showFeedback}
                >
                  <span className="mr-2">{String.fromCharCode(65 + index)}.</span>
                  {option}
                  {showFeedback && selectedAnswer === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4"
                    >
                      {index === question.correctAnswer ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        );
      case 'slider':
      case 'color':
      case 'emoji':
        return (
          <ExperimentalQuestion
            type={question.type}
            question={questionText}
            correctAnswer={question.correctAnswer}
            min={question.min}
            max={question.max}
            step={question.step}
            onAnswer={handleExperimentalAnswer}
          />
        );
      case 'drag-and-drop':
        return (
          <DragAndDropQuestion
            items={question.items || []}
            correctOrder={question.correctOrder || []}
            onAnswer={handleDragAndDropAnswer}
          />
        );
      default:
        return null;
    }
  };

  const handleReaction = (emoji: string) => {
    toast({
      title: "Reaction Added",
      description: `You reacted with ${emoji}`,
    });
  };

  return (
    <DynamicBackground mood={mood}>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <CircularProgress progress={timeLeft / 30} duration={timeLeft} />
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-5 w-5" />
                  ) : (
                    <VolumeX className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(true)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setLanguage(lang => lang === 'en' ? 'es' : lang === 'es' ? 'fr' : 'en')}
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LevelProgress level={level} xp={xp} />
              <div className="text-lg font-bold">Score: {score}</div>
              {streak > 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                >
                  {streak}x Streak!
                </motion.div>
              )}
            </div>
          </div>

          <Progress value={(currentQuestion / questions.length) * 100} className="mb-8" />

          <ShuffleAnimation
            items={questions.map((question, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl font-semibold">{question.question}</h2>
                {renderQuestionContent(question)}
              </div>
            ))}
          />

          <div className="mt-8">
            <ScoreChart
              correct={stats.correct}
              incorrect={stats.incorrect}
              skipped={stats.skipped}
            />
          </div>

          <ReactionBar onReaction={handleReaction} />

          <div className="fixed bottom-4 left-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Keyboard className="h-4 w-4" />
                <span className="text-sm text-muted-foreground">
                  Press A, B, C, or D to select answers
                </span>
              </div>
            </Card>
          </div>
        </div>

        <SettingsPanel
          open={showSettings}
          onClose={() => setShowSettings(false)}
          soundEnabled={soundEnabled}
          onToggleSound={setSoundEnabled}
          language={language}
          onChangeLanguage={setLanguage}
        />

        <QuizSummary
          open={showSummary}
          onClose={() => setShowSummary(false)}
          score={score}
          stats={stats}
          level={level}
          xp={xp}
        />
      </div>
    </DynamicBackground>
  );
}