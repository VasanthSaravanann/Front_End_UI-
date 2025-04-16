"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface ScoreChartProps {
  correct: number;
  incorrect: number;
  skipped: number;
}

export function ScoreChart({ correct, incorrect, skipped }: ScoreChartProps) {
  const data = [
    { name: 'Correct', value: correct },
    { name: 'Incorrect', value: incorrect },
    { name: 'Skipped', value: skipped },
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Score Breakdown</h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  );
}