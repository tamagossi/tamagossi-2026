"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Timeline } from "../../shared/components/ui/timeline";
import { EXPERIENCES } from "../../shared/constants/experiences";
import ExperienceIntro from "./ExperienceIntro";

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="border-accent/30 text-accent rounded-full border bg-transparent px-3 py-1 font-mono text-xs">
    {children}
  </span>
);

export default function ExperienceSection() {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const handleViewportEnter = () => {
    if (!hasPlayed) {
      setShowIntro(true);
      setHasPlayed(true);
    }
  };

  const data = EXPERIENCES.map((experience) => ({
    title: experience.period,
    content: (
      <div className="space-y-4">
        <div>
          <p className="text-foreground text-lg font-bold md:text-xl">{experience.role}</p>
          <p className="text-muted font-mono text-sm">
            {experience.company} · {experience.location}
          </p>
        </div>
        <p className="text-foreground/80 font-sans leading-relaxed font-light">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {experience.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <motion.div
      onViewportEnter={handleViewportEnter}
      viewport={{ amount: 0.2, once: true }}
      className="relative min-h-screen w-full"
    >
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro"
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-background fixed inset-0 z-60 h-screen w-screen"
          >
            <ExperienceIntro onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        animate={{ opacity: hasPlayed && !showIntro ? 1 : 0 }}
      >
        <Timeline data={data} />
      </motion.div>
    </motion.div>
  );
}
