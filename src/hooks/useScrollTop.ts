import { useState, useEffect, useCallback } from 'react';

export function useScrollTop(threshold = 24) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let animationFrameId: number | null = null;

    const updateScrollTopVisibility = () => {
      animationFrameId = null;
      const scrollTop = document.scrollingElement?.scrollTop ?? window.scrollY;
      setShowScrollTop(scrollTop > threshold);
    };

    const scheduleUpdate = () => {
      if (animationFrameId === null) {
        animationFrameId = window.requestAnimationFrame(updateScrollTopVisibility);
      }
    };

    updateScrollTopVisibility();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('pageshow', scheduleUpdate);
    window.visualViewport?.addEventListener('resize', scheduleUpdate);

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('pageshow', scheduleUpdate);
      window.visualViewport?.removeEventListener('resize', scheduleUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { showScrollTop, scrollToTop };
}

