import { useState, useCallback, useRef, useEffect } from 'react';
import { copyTextToClipboard } from '../utils/clipboard.utils';

export function useClipboard(resetDelay = 2500) {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const copy = useCallback(
    async (text: string, label: string) => {
      const ok = await copyTextToClipboard(text);
      if (ok) {
        setCopySuccess(label);
        if (timeoutRef.current !== null) {
          window.clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
          setCopySuccess(null);
          timeoutRef.current = null;
        }, resetDelay);
      }
      return ok;
    },
    [resetDelay]
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copySuccess, copy };
}

