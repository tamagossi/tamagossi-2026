"use client";

import { cn } from "@/shared/utils/cn";
import { motion } from "framer-motion";

export default function ElegantShape({
  className,
  delay = 0,
  gradient = "from-white/[0.08]",
  height = 100,
  rotate = 0,
  width = 400,
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      animate={{
        opacity: 1,
        rotate: rotate,
        y: 0,
      }}
      initial={{
        opacity: 0,
        rotate: rotate - 15,
        y: -150,
      }}
      transition={{
        delay,
        duration: 2.4,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, 15, 0],
        }}
        style={{
          height,
          width,
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "border-2 border-white/[0.15] backdrop-blur-[2px]",
            "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}
