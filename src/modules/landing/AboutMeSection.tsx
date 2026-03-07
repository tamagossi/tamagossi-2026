"use client";

import { useRef } from "react";
import { TextGradientScroll } from "@/shared/components/ui/text-gradient-scroll";
import { useScroll } from "framer-motion";

export default function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
    target: containerRef,
  });

  return (
    <div ref={containerRef} className="bg-background relative z-10 h-[250vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="container px-8 md:px-12 lg:px-4">
          <div className="mx-auto max-w-4xl">
            <TextGradientScroll
              manualProgress={scrollYProgress}
              className="justify-center text-center font-sans text-2xl leading-relaxed font-light md:text-3xl lg:text-4xl"
              text="I am a Product Engineer and Chapter Lead at Staffinc Group. With over 8 years of experience across fintech, education, and workforce management, I specialize in architecting scalable Front-End and Back-End solutions while remaining deeply hands-on with the code."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
