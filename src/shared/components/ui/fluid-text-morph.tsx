"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/shared/utils/cn";
import { AnimatePresence, motion } from "framer-motion";

interface FluidTextMorphProps {
  wordPairs: [string, string][];
  className?: string;
  animationProps?: {
    initialColor?: string;
    animateColor?: string;
    exitColor?: string;
  };
  onClick?: () => void;
}

export function FluidTextMorph({
  animationProps = {},
  className,
  onClick,
  wordPairs,
}: FluidTextMorphProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const {
    animateColor = "hsl(var(--foreground))",
    exitColor = "hsl(var(--destructive))",
    initialColor = "hsl(var(--primary))",
  } = animationProps;

  // Auto-cycle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % wordPairs.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [wordPairs.length]);

  const currentWord = isHovered ? wordPairs[index][1] : wordPairs[index][0];

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverEnd}
      className={cn(
        "relative flex cursor-pointer items-center justify-center text-4xl font-bold sm:text-6xl md:text-8xl",
        className
      )}
    >
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.span
            key="hover-text"
            className="text-accent"
            transition={{ duration: 0.3 }}
            exit={{ filter: "blur(4px)", opacity: 0 }}
            animate={{ filter: "blur(0px)", opacity: 1 }}
            initial={{ filter: "blur(4px)", opacity: 0 }}
          >
            {currentWord}
          </motion.span>
        ) : (
          <motion.div key="morph-text" className="flex">
            <AnimatePresence mode="popLayout">
              {currentWord.split("").map((letter, i) => (
                <motion.span
                  layoutId={`letter-${i}`}
                  key={`${currentWord}-${i}`}
                  className="relative inline-block"
                  initial={{ color: initialColor, opacity: 0, scale: 0.8, y: 30 }}
                  animate={{
                    color: animateColor,
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      damping: 15,
                      delay: i * 0.05,
                      stiffness: 200,
                      type: "spring",
                    },
                  }}
                  exit={{
                    color: exitColor,
                    opacity: 0,
                    scale: 0.8,
                    y: -30,
                    transition: {
                      damping: 15,
                      delay: (currentWord.length - 1 - i) * 0.05,
                      stiffness: 200,
                      type: "spring",
                    },
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
