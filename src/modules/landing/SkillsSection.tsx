"use client";

import React from "react";

import OrbitingSkills from "../../shared/components/ui/orbiting-skills";

const skills = {
  Backend: ["Go Fiber", "Node.js", "REST", "WebSocket"],
  Frontend: ["Next.js", "React", "Vue", "Nuxt", "Tailwind"],
  Infra: ["Docker", "PostgreSQL", "Redis", "Git"],
  Languages: ["TypeScript", "Go", "JavaScript"],
};

export default function SkillsSection() {
  return (
    <section className="bg-background flex min-h-screen items-center justify-center overflow-hidden py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* Left Column: Text */}
          <div className="space-y-12">
            <h2 className="text-foreground font-serif text-5xl italic md:text-7xl">
              What I work with
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-accent font-mono text-sm tracking-wider uppercase">
                    {category}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="text-foreground/80 font-sans text-lg font-light">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Orbiting Skills */}
          <div className="relative flex items-center justify-center">
            {/* Gradient glow behind orbit */}
            <div className="bg-accent/5 pointer-events-none absolute inset-0 rounded-full blur-[100px]" />
            <OrbitingSkills />
          </div>
        </div>
      </div>
    </section>
  );
}
