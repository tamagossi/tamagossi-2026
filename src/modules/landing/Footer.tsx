"use client";

import Link from "next/link";
import { FileText, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-foreground/5 border-t py-20 md:py-32">
      <div className="container mx-auto flex flex-col items-center px-4 text-center md:px-6">
        <h2 className="text-foreground mb-4 font-serif text-4xl font-bold md:text-6xl lg:text-7xl">
          Let&apos;s work together.
        </h2>

        <p className="text-muted mb-4 max-w-xl font-sans text-lg font-light md:text-xl">
          Available for remote full-time or contract.
          <br />
          Based in Jakarta (UTC+7). Async-friendly.
        </p>

        <a
          className="text-accent mb-16 font-mono text-xl decoration-2 underline-offset-8 transition-all hover:underline lg:text-2xl"
          href="mailto:hello@tamagossi.dev"
        >
          hello@tamagossi.dev
        </a>

        <div className="mb-20 flex items-center gap-8">
          <Link
            className="text-muted hover:text-accent transition-colors"
            href="https://github.com/tamagossi"
            target="_blank"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </Link>
          <Link
            className="text-muted hover:text-accent transition-colors"
            href="https://linkedin.com/in/tamagossi"
            target="_blank"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link className="text-muted hover:text-accent transition-colors" href="/resume">
            <span className="sr-only">Resume</span>
            <FileText className="h-6 w-6" />
          </Link>
        </div>

        <div className="border-foreground/5 w-full border-t pt-8">
          <p className="text-foreground/30 font-mono text-xs">© Tamagossi 2026</p>
        </div>
      </div>
    </footer>
  );
}
