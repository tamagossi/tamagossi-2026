"use client";

import { useRef } from "react";
import Link from "next/link";
import { projects } from "@/shared/constants/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(projects.length - 1) * 100}vw`]);

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#030303", "#050505", "#080808", "#080808"]
  );

  if (!projects.length) return null;

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 flex h-screen items-center overflow-hidden"
      >
        <div className="absolute top-0 right-0 left-0 z-20 flex w-full items-center justify-between px-4 py-6 md:px-20 md:py-10">
          <motion.div
            viewport={{ once: false }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col gap-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <motion.h2
              viewport={{ once: false }}
              exit={{ opacity: 0, y: 10 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-foreground text-4xl font-light tracking-tighter uppercase md:text-6xl"
            >
              Projects
            </motion.h2>
            <motion.p
              viewport={{ once: false }}
              exit={{ opacity: 0, y: 10 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-muted-foreground text-sm md:text-base"
            >
              Selected works from 2020-2026
            </motion.p>
          </motion.div>

          <motion.div
            viewport={{ once: false }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/projects"
              className="group text-foreground flex items-center gap-2 text-sm tracking-wider uppercase hover:underline"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        <motion.div style={{ x }} className="flex">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex h-screen w-screen shrink-0 flex-col items-center justify-center gap-8 p-4 md:flex-row md:gap-20 md:p-20"
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
              <div className="bg-surface border-foreground/5 group relative aspect-video w-full flex-1 overflow-hidden rounded-xl border shadow-2xl">
                {/* Abstract placeholder visual */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                <div className="text-foreground/20 absolute right-4 bottom-4 font-mono text-xs">
                  Placeholder for {project.title}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
