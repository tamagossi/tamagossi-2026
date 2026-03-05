"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    offset: ["start 10%", "end 50%"],
    target: containerRef,
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="bg-background mt-20 w-full font-sans md:px-10">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10">
        <h2 className="text-foreground mb-4 max-w-4xl font-serif text-lg md:text-4xl">
          Where I&apos;ve worked
        </h2>

        <p className="text-muted max-w-sm text-sm font-light md:text-base">
          ~8 years building products across startups, scale-ups, and tech companies.
        </p>
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="bg-background absolute left-3 flex h-10 w-10 items-center justify-center rounded-full md:left-3">
                <div className="bg-surface border-accent/30 h-4 w-4 rounded-full border p-2" />
              </div>
              <h3 className="text-foreground/20 hidden font-serif text-xl font-bold italic md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pr-4 pl-20 md:pl-4">
              <h3 className="text-foreground/50 mb-4 block text-left font-serif text-2xl font-bold italic md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          className="via-surface absolute top-0 left-8 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
          style={{
            height: height + "px",
          }}
        >
          <motion.div
            className="from-accent via-accent/50 absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-[0%] via-[10%] to-transparent"
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
          />
        </div>
      </div>
    </div>
  );
};
