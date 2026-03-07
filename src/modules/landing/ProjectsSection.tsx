"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    color: "#030303",
    desc: "A developer-facing tooling platform built to reduce onboarding time for new engineers. Reduced setup from 2 days to under 2 hours.",
    id: "01",
    slug: "project-alpha",
    subtitle: "Internal tooling platform",
    tags: ["Next.js", "Go", "Docker"],
    title: "Project Alpha",
  },
  {
    color: "#050505",
    desc: "High-traffic mobile web experience serving 500k+ monthly users. Focused on Core Web Vitals and offline capability via service workers.",
    id: "02",
    slug: "project-beta",
    subtitle: "Consumer mobile web app",
    tags: ["React", "PWA", "Redis"],
    title: "Project Beta",
  },
  {
    color: "#080808",
    desc: "Live analytics dashboard for ops teams. Replaced spreadsheet-based reporting with real-time charts and automated alerting.",
    id: "03",
    slug: "project-gamma",
    subtitle: "Real-time analytics dashboard",
    tags: ["Vue.js", "Go Fiber", "WebSocket"],
    title: "Project Gamma",
  },
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: containerRef,
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#030303", "#050505", "#080808", "#080808"]
  );

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="relative container mx-auto h-full px-4 md:px-6">
          {projects.map((project, i) => {
            // Calculate range for this project
            const start = i / projects.length;
            const end = (i + 1) / projects.length;

            // Opacity and Y animations based on scroll
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [0, 1, 1, 0]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(
              scrollYProgress,
              [start, start + 0.1, end - 0.1, end],
              [50, 0, 0, -50]
            );

            // Image parallax
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const imgY = useTransform(scrollYProgress, [start, end], ["5%", "-5%"]);

            return (
              <motion.div
                key={project.id}
                style={{ opacity, pointerEvents: "auto", y }}
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8 p-4 md:flex-row md:gap-20 md:p-20"
              >
                {/* Left Content */}
                <div className="z-10 max-w-xl flex-1 space-y-6">
                  <div className="relative">
                    <span className="text-foreground/5 absolute -top-12 -left-4 z-0 font-mono text-[6rem] select-none md:-top-20 md:-left-20 md:text-[10rem]">
                      {project.id}
                    </span>
                    <h2 className="text-foreground relative z-10 font-serif text-4xl italic md:text-7xl">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-muted font-sans text-lg font-light md:text-xl">
                    {project.subtitle}
                  </p>

                  <p className="text-foreground/80 max-w-md font-sans text-base leading-relaxed md:text-lg">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-accent/30 text-accent rounded-full border bg-transparent px-3 py-1 font-mono text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/project/${project.slug}`}
                    className="text-accent group mt-4 inline-flex items-center gap-2 hover:underline"
                  >
                    View case study{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Right Image Placeholder */}
                <motion.div
                  style={{ y: imgY }}
                  className="bg-surface border-foreground/5 group relative aspect-video w-full flex-1 overflow-hidden rounded-xl border shadow-2xl"
                >
                  {/* Abstract placeholder visual */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                  <div className="text-foreground/20 absolute right-4 bottom-4 font-mono text-xs">
                    Placeholder for {project.title}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
