"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import { navigationItems } from "../constants/menus";
import FullPageMenu from "./ui/full-page-menu";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const iconRef1 = useRef<SVGLineElement>(null);
  const iconRef2 = useRef<SVGLineElement>(null);
  const iconRef3 = useRef<SVGLineElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        gsap.to(iconRef1.current, {
          duration: 0.3,
          rotation: 45,
          transformOrigin: "center",
          y: 6,
        });
        gsap.to(iconRef2.current, {
          duration: 0.3,
          opacity: 0,
        });
        gsap.to(iconRef3.current, {
          duration: 0.3,
          rotation: -45,
          transformOrigin: "center",
          y: -6,
        });
      } else {
        gsap.to(iconRef1.current, {
          duration: 0.3,
          rotation: 0,
          transformOrigin: "center",
          y: 0,
        });
        gsap.to(iconRef2.current, {
          duration: 0.3,
          opacity: 1,
        });
        gsap.to(iconRef3.current, {
          duration: 0.3,
          rotation: 0,
          transformOrigin: "center",
          y: 0,
        });
      }
    }, buttonRef);
    return () => ctx.revert();
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="focus:ring-accent bg-accent focus:ring-offset-background fixed right-8 bottom-8 z-1001 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-110 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        <svg
          width="24"
          fill="none"
          height="24"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" y1="6" y2="6" x2="20" ref={iconRef1} />
          <line x1="4" x2="20" y1="12" y2="12" ref={iconRef2} />
          <line x1="4" x2="20" y1="18" y2="18" ref={iconRef3} />
        </svg>
      </button>

      <FullPageMenu isOpen={isOpen} menus={navigationItems} onClose={() => setIsOpen(false)} />
    </>
  );
}
