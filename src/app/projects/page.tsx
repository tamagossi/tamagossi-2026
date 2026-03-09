import Link from "next/link";
import { projects } from "@/shared/constants/projects";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="bg-background text-foreground min-h-screen p-8 md:p-20">
      <Link
        href="/"
        className="text-accent fixed top-8 left-8 z-50 flex items-center gap-2 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>

      <div className="mx-auto max-w-6xl pt-20">
        <h1 className="mb-4 font-serif text-4xl italic md:text-6xl">Selected Works</h1>
        <p className="text-muted mb-20 max-w-xl font-sans text-lg font-light">
          A collection of projects I&apos;ve worked on, ranging from internal tools to high-traffic
          consumer apps.
        </p>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col gap-8 md:flex-row md:gap-20 ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content */}
              <div className="flex-1 space-y-6">
                <div className="relative">
                  <span className="text-foreground/5 absolute -top-12 -left-4 z-0 font-mono text-[6rem] select-none md:-top-20 md:-left-20 md:text-[8rem]">
                    {project.id}
                  </span>
                  <h2 className="text-foreground relative z-10 font-serif text-3xl italic md:text-5xl">
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

              {/* Image Placeholder */}
              <div className="bg-surface border-foreground/5 group relative aspect-video w-full flex-1 overflow-hidden rounded-xl border shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
                <div className="text-foreground/20 absolute right-4 bottom-4 font-mono text-xs">
                  Placeholder for {project.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
