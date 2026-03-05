"use client";

import React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { TextRoll } from "./animated-menu";

interface FullPageMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menus: {
    name: string;
    href: string;
    description: string;
  }[];
}

export default function FullPageMenu({ isOpen, menus, onClose }: FullPageMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="bg-background text-foreground fixed inset-0 z-[1000] flex flex-col items-center justify-center"
          exit={{ opacity: 0, y: "100%" }}
          initial={{ opacity: 0, y: "100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <ul className="flex min-h-full w-full flex-1 flex-col items-center justify-center gap-4 px-7 py-3">
            {menus.map((item, index) => (
              <li
                key={index}
                className="relative flex cursor-pointer flex-col items-center overflow-visible"
              >
                <Link className="relative flex items-start" href={item.href} onClick={onClose}>
                  <TextRoll
                    center
                    className="hover:text-accent text-5xl leading-[0.8] font-extrabold tracking-[-0.03em] uppercase transition-colors lg:text-7xl"
                  >
                    {item.name}
                  </TextRoll>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
