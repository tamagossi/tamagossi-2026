"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const posts = [
  {
    date: "Feb 2025",
    readTime: "6 min",
    slug: "unit-tests",
    title: "Why I stopped writing unit tests first",
  },
  {
    date: "Jan 2025",
    readTime: "8 min",
    slug: "go-fiber-middleware",
    title: "Designing Go Fiber middleware the right way",
  },
  {
    date: "Dec 2024",
    readTime: "5 min",
    slug: "chapter-lead",
    title: "What 'Chapter Lead' actually means day to day",
  },
];

export default function BlogTeaser() {
  return (
    <section className="bg-background py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-foreground mb-12 font-serif text-5xl italic md:mb-20 md:text-7xl">
          Writing
        </h2>

        <div className="divide-foreground/10 border-foreground/10 space-y-0 divide-y border-t border-b">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              className="group"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group-hover:bg-accent/5 flex flex-col justify-between px-4 py-8 transition-colors md:flex-row md:items-center md:py-12"
              >
                <h3 className="text-foreground group-hover:text-accent mb-2 font-sans text-xl font-light transition-colors md:mb-0 md:text-3xl">
                  {post.title}
                </h3>
                <div className="text-foreground/40 flex items-center gap-4 font-mono text-sm md:text-base">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-end">
          <Link
            href="/blog"
            className="text-accent inline-flex items-center gap-2 font-mono hover:underline"
          >
            All posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
