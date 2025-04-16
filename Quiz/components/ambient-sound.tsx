"use client";

import { useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';

interface AmbientSoundProps {
  category: string;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const soundMap = {
  science: '/sounds/lab-ambient.mp3',
  nature: '/sounds/forest-ambient.mp3',
  history: '/sounds/ancient-ambient.mp3',
  technology: '/sounds/cyber-ambient.mp3',
  default: '/sounds/neutral-ambient.mp3',
};

export function AmbientSound({ category, isEnabled, onToggle }: AmbientSoundProps) {
  const soundRef = useRef<Howl | null>(null);

  useEffect(() => {
    const soundUrl = soundMap[category as keyof typeof soundMap] || soundMap.default;
    
    soundRef.current = new Howl({
      src: [soundUrl],
      loop: true,
      volume: 0.2,
    });

    return () => {
      soundRef.current?.unload();
    };
  }, [category]);

  useEffect(() => {
    if (isEnabled) {
      soundRef.current?.play();
    } else {
      soundRef.current?.pause();
    }
  }, [isEnabled]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onToggle(!isEnabled)}
      className="relative group"
    >
      {isEnabled ? (
        <Volume2 className="h-5 w-5 transition-transform group-hover:scale-110" />
      ) : (
        <VolumeX className="h-5 w-5 transition-transform group-hover:scale-110" />
      )}
    </Button>
  );
}