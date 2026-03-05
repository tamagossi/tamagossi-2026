"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion";

const STAGGER = 0.035;

// --- Helper Component (Renamed from Component to TextRoll) ---
const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ center = false, children, className }) => {
  return (
    <motion.span
      className={cn("relative block overflow-hidden", className)}
      initial="initial"
      whileHover="hovered"
      style={{
        lineHeight: 0.85,
      }}
    >
      {/* Top Text (Slides up) */}
      <div>
        {children.split("").map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;

          return (
            <motion.span
              key={i}
              className="inline-block"
              transition={{
                delay,
                ease: "easeInOut",
              }}
              variants={{
                hovered: {
                  y: "-100%",
                },
                initial: {
                  y: 0,
                },
              }}
            >
              {l}
            </motion.span>
          );
        })}
      </div>

      {/* Bottom Text (Slides in from bottom) */}
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center ? STAGGER * Math.abs(i - (children.length - 1) / 2) : STAGGER * i;

          return (
            <motion.span
              key={i}
              className="inline-block"
              transition={{
                delay,
                ease: "easeInOut",
              }}
              variants={{
                hovered: {
                  y: 0,
                },
                initial: {
                  y: "100%",
                },
              }}
            >
              {l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export { TextRoll };
