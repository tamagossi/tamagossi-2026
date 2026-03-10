"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

import { FluidTextMorph } from "../../shared/components/ui/fluid-text-morph";

const WORD_PAIRS: [string, string][] = [
  ["Architecting", "Show experience"],
  ["Designing", "Show experience"],
  ["Developing", "Show experience"],
];

export default function ExperienceIntro({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden";
    // Restore scrolling on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="bg-background flex h-full w-full items-center justify-center overflow-hidden">
      <motion.div
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
      >
        <FluidTextMorph
          onClick={onComplete}
          wordPairs={WORD_PAIRS}
          className="text-foreground text-5xl md:text-8xl"
        />
        <motion.p
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-muted mt-8 text-center text-sm font-light tracking-widest uppercase"
        >
          Click to explore
        </motion.p>
      </motion.div>
    </div>
  );
}
