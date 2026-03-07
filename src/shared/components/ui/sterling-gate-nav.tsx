"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import gsap from "gsap";

interface SterlingGateNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { href: "/#projects", label: "Work" },
  { href: "/#blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "mailto:hello@tamagossi.dev", label: "Contact" },
];

export default function SterlingGateNav({ isOpen, onClose }: SterlingGateNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.set(containerRef.current, { display: "block" });

        // Panels
        gsap.to([panel1Ref.current, panel2Ref.current, panel3Ref.current], {
          duration: 0.8,
          ease: "power3.inOut",
          stagger: 0.1,
          xPercent: 0,
        });

        // Links
        gsap.fromTo(
          linkRefs.current,
          { opacity: 0, rotate: 10, yPercent: 140 },
          {
            delay: 0.4,
            duration: 0.8,
            ease: "power3.out",
            opacity: 1,
            rotate: 0,
            stagger: 0.05,
            yPercent: 0,
          }
        );
      } else {
        // Reverse
        gsap.to([panel3Ref.current, panel2Ref.current, panel1Ref.current], {
          duration: 0.6,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(containerRef.current, { display: "none" });
          },
          stagger: 0.05,
          xPercent: 101,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[1000] hidden">
      {/* Overlay/Backdrop - Click to close */}
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Panels */}
      <div
        ref={panel1Ref}
        className="bg-background absolute inset-y-0 right-0 z-10 w-full translate-x-full md:w-1/2"
      />
      <div
        ref={panel2Ref}
        className="absolute inset-y-0 right-0 z-20 w-full translate-x-full bg-zinc-950 md:w-1/2"
      />
      <div
        ref={panel3Ref}
        className="bg-surface absolute inset-y-0 right-0 z-30 flex w-full translate-x-full flex-col justify-center px-12 md:w-1/2 md:px-24"
      >
        <nav className="flex flex-col space-y-4 overflow-hidden py-4">
          {links.map((link, i) => (
            <div key={link.label} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                className="text-foreground hover:text-accent block origin-left font-serif text-[4rem] leading-tight italic transition-colors duration-200 md:text-[6rem]"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="text-muted mt-12 flex gap-8 font-mono text-sm">
          <a href="mailto:hello@tamagossi.dev" className="hover:text-accent transition-colors">
            hello@tamagossi.dev
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            GitHub
          </a>
          <a href="#" className="hover:text-accent transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}
