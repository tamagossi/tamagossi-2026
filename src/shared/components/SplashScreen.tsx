"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const words = [
  "Sampurasun", // Sundanese
  "Hello", // English
  "안녕하세요", // Korean
  "こんにちは", // Japanese
  "مرحبا", // Arabic
  "Hai",
];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check session storage
    const hasShown = sessionStorage.getItem("splashShown");
    if (hasShown) {
      // Use setTimeout to avoid synchronous state update warning
      setTimeout(() => {
        setIsVisible(false);
        onComplete();
      }, 0);
      return;
    }

    const interval = setInterval(() => {
      setIndex((prev) => {
        // Allow going one past the last word to trigger the exit animation
        if (prev === words.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 500); // Speed up for more words

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // When index reaches words.length (meaning "Tamagossi" has finished its time)
    if (index === words.length) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // sessionStorage.setItem('splashShown', 'true');
        onComplete();
      }, 1500); // Wait for zoom animation
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="bg-background fixed inset-0 z-[9999] flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid w-full place-items-center">
        <AnimatePresence>
          {index < words.length - 1 ? (
            <motion.h1
              key={words[index]}
              animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              className="text-foreground col-start-1 row-start-1 font-serif text-[3rem] font-bold md:text-[7rem]"
              initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{
                filter: "blur(10px)",
                opacity: 0,
                transition: { duration: 0.3, ease: "easeInOut" },
                y: -20,
              }}
            >
              {words[index]}
            </motion.h1>
          ) : index === words.length - 1 ? (
            <motion.h1
              key="final"
              animate={{ opacity: 1, scale: 1 }}
              className="col-start-1 row-start-1 font-serif text-[3rem] font-bold text-white md:text-[7rem]"
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              exit={{
                filter: "blur(20px)",
                opacity: 0,
                scale: 20,
                transition: { delay: 0.8, duration: 0.8, ease: "easeIn" },
              }}
            >
              Hai
            </motion.h1>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
