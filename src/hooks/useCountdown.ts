import { useState, useEffect } from 'react';
import type { TimeLeft } from '../types/countdown.types';

export function useCountdown(targetDateStr: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!targetDateStr) return;
    const weddingTarget = new Date(targetDateStr).getTime();
    if (isNaN(weddingTarget)) return;

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, weddingTarget - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [targetDateStr]);

  return timeLeft;
}
