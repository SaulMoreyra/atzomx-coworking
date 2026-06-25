"use client";

import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useEffect, useState } from "react";

const TYPE_MS = 75;
const PAUSE_MS = 2000;

export function useRotatingTypewriter(words: string[]) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState(words[0] ?? "");

  const activeWord = words[index] ?? "";

  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) {
      setDisplayed(activeWord);
      return;
    }

    let charIndex = 0;
    let typeTimer: ReturnType<typeof setTimeout> | undefined;
    let pauseTimer: ReturnType<typeof setTimeout> | undefined;

    setDisplayed("");

    const typeNextChar = () => {
      charIndex += 1;
      setDisplayed(activeWord.slice(0, charIndex));

      if (charIndex < activeWord.length) {
        typeTimer = setTimeout(typeNextChar, TYPE_MS);
        return;
      }

      pauseTimer = setTimeout(() => {
        setIndex(current => (current + 1) % words.length);
      }, PAUSE_MS);
    };

    typeTimer = setTimeout(typeNextChar, TYPE_MS);

    return () => {
      if (typeTimer) clearTimeout(typeTimer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [activeWord, prefersReducedMotion, words.length]);

  return {
    displayed: prefersReducedMotion ? (words[0] ?? "") : displayed,
    prefersReducedMotion,
    showCursor: !prefersReducedMotion,
  };
}
