"use client";

import React from "react";
import { cn } from "@/shared/utils/cn";

interface Skill {
  id: string;
  orbitRadius: number;
  iconType: string;
  label: string;
  speed: number;
  phaseShift?: number;
}

const TechIcon = ({ type }: { type: string }) => {
  // Simple SVG placeholders for brands
  switch (type) {
    case "typescript":
      return <span className="text-xs font-bold text-blue-500">TS</span>;
    case "go":
      return <span className="text-xs font-bold text-cyan-500">GO</span>;
    case "javascript":
      return <span className="text-xs font-bold text-yellow-400">JS</span>;
    case "nextjs":
      return <span className="text-xs font-bold text-white">NEXT</span>;
    case "react":
      return <span className="text-xs font-bold text-blue-400">RCT</span>;
    case "vue":
      return <span className="text-xs font-bold text-green-500">VUE</span>;
    case "gofiber":
      return <span className="text-xs font-bold text-green-400">FBR</span>;
    default:
      return <span className="text-xs font-bold text-gray-400">?</span>;
  }
};

export default function OrbitingSkills() {
  const innerSkills: Skill[] = [
    {
      iconType: "typescript",
      id: "typescript",
      label: "TypeScript",
      orbitRadius: 100,
      speed: 20,
    },
    { iconType: "go", id: "go", label: "Go", orbitRadius: 100, phaseShift: 240, speed: 20 },
    {
      iconType: "javascript",
      id: "javascript",
      label: "JavaScript",
      orbitRadius: 100,
      phaseShift: 120,
      speed: 20,
    },
  ];

  const outerSkills: Skill[] = [
    { iconType: "nextjs", id: "nextjs", label: "Next.js", orbitRadius: 180, speed: 30 },
    {
      iconType: "react",
      id: "react",
      label: "React",
      orbitRadius: 180,
      phaseShift: 90,
      speed: 30,
    },
    {
      iconType: "vue",
      id: "vue",
      label: "Vue / Nuxt",
      orbitRadius: 180,
      phaseShift: 180,
      speed: 30,
    },
    {
      iconType: "gofiber",
      id: "gofiber",
      label: "Go Fiber",
      orbitRadius: 180,
      phaseShift: 270,
      speed: 30,
    },
  ];

  return (
    <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
      {/* Center */}
      <div className="from-accent to-surface z-10 flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br shadow-2xl">
        <span className="text-2xl font-bold text-white">T</span>
      </div>

      {/* Inner Ring */}
      <div className="border-accent/40 absolute h-[200px] w-[200px] rounded-full border opacity-50" />

      {innerSkills.map((skill) => (
        <OrbitingItem
          radius={100}
          key={skill.id}
          duration={skill.speed}
          angle={skill.phaseShift || 0}
        >
          <div className="bg-surface border-accent/20 hover:border-accent flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-colors">
            <TechIcon type={skill.iconType} />
          </div>
        </OrbitingItem>
      ))}

      {/* Outer Ring */}
      <div className="border-surface absolute h-[360px] w-[360px] rounded-full border opacity-50" />

      {outerSkills.map((skill) => (
        <OrbitingItem
          reverse
          radius={180}
          key={skill.id}
          duration={skill.speed}
          angle={skill.phaseShift || 0}
        >
          <div className="bg-surface border-accent/20 hover:border-accent flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-colors">
            <TechIcon type={skill.iconType} />
          </div>
        </OrbitingItem>
      ))}
    </div>
  );
}

function OrbitingItem({
  angle = 0,
  children,
  duration,
  radius,
  reverse = false,
}: {
  children: React.ReactNode;
  radius: number;
  duration: number;
  delay?: number;
  reverse?: boolean;
  angle?: number;
}) {
  return (
    <div
      className={cn("absolute flex items-center justify-center")}
      style={{
        height: radius * 2,
        transform: `rotate(${angle}deg)`, // Initial offset
        width: radius * 2,
      }}
    >
      <div
        className={cn("absolute h-full w-full animate-spin")}
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: `${duration}s`,
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="animate-spin"
            style={{
              animationDirection: reverse ? "normal" : "reverse",
              animationDuration: `${duration}s`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
