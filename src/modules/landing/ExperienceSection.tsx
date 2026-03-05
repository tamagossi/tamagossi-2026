"use client";

import React from "react";

import { Timeline } from "../../shared/components/ui/timeline";

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="border-accent/30 text-accent rounded-full border bg-transparent px-3 py-1 font-mono text-xs">
    {children}
  </span>
);

export default function ExperienceSection() {
  const data = [
    {
      title: "2022 — Now",
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-foreground text-lg font-bold md:text-xl">
              Chapter Lead Product Engineer
            </p>
            <p className="text-muted font-mono text-sm">Current Company · Jakarta</p>
          </div>
          <p className="text-foreground/80 font-sans leading-relaxed font-light">
            Leading a chapter of engineers across product squads. Define engineering standards,
            conduct technical reviews, and ship core platform features in Next.js and Go Fiber.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Tag>Next.js</Tag>
            <Tag>Go Fiber</Tag>
            <Tag>System Design</Tag>
            <Tag>Tech Leadership</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "2020 — 2022",
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-foreground text-lg font-bold md:text-xl">
              Senior Full-Stack Engineer
            </p>
            <p className="text-muted font-mono text-sm">Previous Company · Jakarta</p>
          </div>
          <p className="text-foreground/80 font-sans leading-relaxed font-light">
            Built and maintained high-traffic consumer products. Owned full delivery from API design
            to frontend implementation with focus on performance and DX.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Tag>React</Tag>
            <Tag>Node.js</Tag>
            <Tag>PostgreSQL</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "2018 — 2020",
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-foreground text-lg font-bold md:text-xl">Full-Stack Engineer</p>
            <p className="text-muted font-mono text-sm">Startup · Jakarta</p>
          </div>
          <p className="text-foreground/80 font-sans leading-relaxed font-light">
            Early engineer on a B2B SaaS product. Shaped the frontend architecture from scratch and
            integrated third-party APIs for payments and logistics.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Tag>Vue.js</Tag>
            <Tag>Laravel</Tag>
            <Tag>MySQL</Tag>
          </div>
        </div>
      ),
    },
    {
      title: "2016 — 2018",
      content: (
        <div className="space-y-4">
          <div>
            <p className="text-foreground text-lg font-bold md:text-xl">Frontend Developer</p>
            <p className="text-muted font-mono text-sm">Digital Agency · Jakarta</p>
          </div>
          <p className="text-foreground/80 font-sans leading-relaxed font-light">
            Delivered client projects for e-commerce and media brands. First real exposure to
            performance optimization and cross-browser compatibility at scale.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Tag>HTML/CSS</Tag>
            <Tag>JavaScript</Tag>
            <Tag>jQuery</Tag>
          </div>
        </div>
      ),
    },
  ];

  return <Timeline data={data} />;
}
