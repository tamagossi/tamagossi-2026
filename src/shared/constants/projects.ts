import exampleMd from "@/content/projects/example.md";
import matter from "gray-matter";

export interface Project {
  color: string;
  content?: string;
  desc: string;
  id: string;
  slug: string;
  subtitle: string;
  tags: string[];
  title: string;
}

const { content, data: frontmatter } = matter(exampleMd);

export const projects: Project[] = [
  {
    ...(frontmatter as Project),
    content,
  },
  {
    color: "#030303",
    desc: "A developer-facing tooling platform built to reduce onboarding time for new engineers. Reduced setup from 2 days to under 2 hours.",
    id: "01",
    slug: "project-alpha",
    subtitle: "Internal tooling platform",
    tags: ["Next.js", "Go", "Docker"],
    title: "Project Alpha",
  },
  {
    color: "#050505",
    desc: "High-traffic mobile web experience serving 500k+ monthly users. Focused on Core Web Vitals and offline capability via service workers.",
    id: "02",
    slug: "project-beta",
    subtitle: "Consumer mobile web app",
    tags: ["React", "PWA", "Redis"],
    title: "Project Beta",
  },
  {
    color: "#080808",
    desc: "Live analytics dashboard for ops teams. Replaced spreadsheet-based reporting with real-time charts and automated alerting.",
    id: "03",
    slug: "project-gamma",
    subtitle: "Real-time analytics dashboard",
    tags: ["Vue.js", "Go Fiber", "WebSocket"],
    title: "Project Gamma",
  },
];
