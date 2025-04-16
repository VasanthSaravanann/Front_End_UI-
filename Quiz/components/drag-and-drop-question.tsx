"use client";

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from '@/components/sortable-item';
import { Card } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

interface DragAndDropQuestionProps {
  items: string[];
  correctOrder: number[];
  onAnswer: (isCorrect: boolean) => void;
}

export function DragAndDropQuestion({ items, correctOrder, onAnswer }: DragAndDropQuestionProps) {
  const [sortedItems, setSortedItems] = useState(items);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSortedItems((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over.id.toString());
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const checkAnswer = () => {
    const currentOrder = sortedItems.map(item => items.indexOf(item));
    const isCorrect = currentOrder.every((item, index) => correctOrder[index] === index);
    setHasSubmitted(true);
    onAnswer(isCorrect);
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Order these items correctly</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sortedItems} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {sortedItems.map((item) => (
              <SortableItem key={item} id={item}>
                <div className="bg-secondary p-4 rounded-md cursor-move">
                  {item}
                </div>
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
      
      <AnimatePresence>
        {!hasSubmitted && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded-md"
            onClick={checkAnswer}
          >
            Check Answer
          </motion.button>
        )}
      </AnimatePresence>
    </Card>
  );
}