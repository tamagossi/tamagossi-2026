export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  technologies: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "Staffinc Group",
    location: "Jakarta, Indonesia",
    period: "May 2024 — Present",
    role: "Front-End Chapter Lead",
    technologies: ["Next.js", "TypeScript", "DDD", "Unit Testing"],
    description:
      "Leading the front-end chapter for Indonesia's leading digital staffing platform. Reduced build times by 60%, decreased bug rates significantly, and led domain-driven design migration while establishing engineering standards.",
  },
  {
    company: "Edulab Indonesia",
    location: "Remote, Indonesia",
    period: "Aug 2024 — Apr 2025",
    role: "Part-time Front-End Engineer",
    technologies: ["React", "Performance", "Design System"],
    description:
      "Optimized platform performance by reducing network calls and eliminating unnecessary re-renders. Accelerated development speed by implementing a consistent design system.",
  },
  {
    company: "Tribe Fintech",
    location: "Remote, Ireland",
    period: "Jun 2023 — Mar 2025",
    role: "Part-time Front-End Engineer",
    technologies: ["OpenAI API", "React", "DDD"],
    description:
      "Developed AI-powered tools using OpenAI and Travily APIs. Refactored legacy codebases to domain-driven design to enhance maintainability and debuggability.",
  },
  {
    company: "Staffinc Group",
    location: "Bandung, Indonesia",
    period: "Apr 2020 — May 2024",
    role: "Front-End Software Engineer",
    technologies: ["React", "Monorepo", "Design System", "DDD"],
    description:
      "Accelerated development velocity by creating design system and monorepo architecture. Migrated Client Portal to domain-driven design, significantly improving developer experience.",
  },
  {
    company: "Smooets",
    location: "Bandung, Indonesia",
    period: "Jul 2019 — Mar 2020",
    role: "Team Lead",
    technologies: ["Angular", "React", "Node.js", "Leadership"],
    description:
      "Led 3 teams across 4 projects while mentoring fresh graduates. Managed delivery of high-quality software systems using Angular, React, and Node.js.",
  },
  {
    company: "Smooets",
    location: "Bandung, Indonesia",
    period: "Oct 2018 — Jun 2019",
    role: "Front-End Developer",
    technologies: ["Angular", "TypeScript"],
    description:
      "Digitized plantation management systems for a leading palm oil company by building Angular applications from scratch, replacing manual Excel-based workflows.",
  },
];
