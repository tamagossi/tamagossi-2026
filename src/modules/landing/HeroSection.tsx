"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

import ElegantShape from "../../shared/components/ui/shape-hero";

export default function HeroSection({ startAnimation = true }: { startAnimation?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 80 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const gradientBackground = useTransform(
    [x, y],
    ([latestX, latestY]) =>
      `radial-gradient(600px circle at ${latestX}px ${latestY}px, var(--accent-glow), transparent 40%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.15,
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <motion.div
      ref={containerRef}
      style={{ y: yParallax }}
      className="bg-background relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* Cursor Glow */}
      <motion.div
        style={{ background: gradientBackground }}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
      />

      {/* Floating Shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {startAnimation && (
          <>
            <ElegantShape
              delay={0.3}
              rotate={20}
              width={600}
              height={140}
              gradient="from-accent/10"
              className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
            />

            <ElegantShape
              delay={0.5}
              width={500}
              height={120}
              rotate={-15}
              gradient="from-surface/60"
              className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
            />
            <ElegantShape
              delay={0.4}
              height={80}
              rotate={20}
              width={300}
              gradient="from-accent/5"
              className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
            />
            <ElegantShape
              delay={0.6}
              height={60}
              rotate={20}
              width={200}
              gradient="from-surface/40"
              className="top-[10%] right-[5%] md:top-[15%] md:right-[15%]"
            />
            <ElegantShape
              rotate={0}
              delay={0.5}
              width={140}
              height={600}
              gradient="from-accent/20"
              className="top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            />

            <ElegantShape
              delay={0.7}
              height={40}
              width={150}
              rotate={-25}
              gradient="from-accent/5"
              className="top-[5%] left-[20%] hidden md:top-[10%] md:left-[30%] md:block"
            />

            <ElegantShape
              delay={0.8}
              height={40}
              width={150}
              rotate={-80}
              gradient="from-accent/10"
              className="right-[20%] bottom-[50%] hidden lg:block"
            />
          </>
        )}
      </div>

      {/* Top Right Badge */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        animate={startAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        className="text-accent absolute top-8 right-8 flex items-center gap-2 font-mono text-xs md:text-sm"
      >
        <div className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        Open to remote · EU / US
      </motion.div>

      {/* Center Content */}
      <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            custom={0}
            initial="hidden"
            variants={fadeUpVariants}
            animate={startAnimation ? "visible" : "hidden"}
            className="bg-surface/50 border-surface mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 md:mb-12"
          >
            <span className="text-muted font-mono text-xs tracking-wide uppercase md:text-sm">
              Chapter Lead Product Engineer
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            variants={fadeUpVariants}
            animate={startAnimation ? "visible" : "hidden"}
            className="text-foreground mb-6 font-serif text-6xl font-bold tracking-tight md:mb-8 md:text-8xl lg:text-9xl"
          >
            Tamagossi
          </motion.h1>

          <motion.h3
            custom={2}
            initial="hidden"
            variants={fadeUpVariants}
            animate={startAnimation ? "visible" : "hidden"}
            className="text-foreground/80 mb-2 font-serif text-3xl font-semibold tracking-tight md:mb-4 md:text-5xl"
          >
            I build products, I lead teams.
          </motion.h3>

          <motion.h2
            custom={4}
            initial="hidden"
            variants={fadeUpVariants}
            animate={startAnimation ? "visible" : "hidden"}
            className="text-accent-gradient mb-8 font-serif text-2xl font-semibold tracking-tight md:text-4xl"
          >
            Ship things that matter.
          </motion.h2>

          <motion.p
            custom={5}
            initial="hidden"
            variants={fadeUpVariants}
            animate={startAnimation ? "visible" : "hidden"}
            className="text-muted mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed font-light md:text-xl"
          >
            Product engineer and chapter lead based in Bandung.
          </motion.p>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ delay: 2, duration: 1 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        className="text-muted absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-xs tracking-widest uppercase">scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="from-background pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-linear-to-t via-transparent to-transparent"></div>
    </motion.div>
  );
}
