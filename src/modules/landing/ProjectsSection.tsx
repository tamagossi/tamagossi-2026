'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
	{
		id: '01',
		slug: 'project-alpha',
		title: 'Project Alpha',
		subtitle: 'Internal tooling platform',
		desc: 'A developer-facing tooling platform built to reduce onboarding time for new engineers. Reduced setup from 2 days to under 2 hours.',
		tags: ['Next.js', 'Go', 'Docker'],
		color: '#030303',
	},
	{
		id: '02',
		slug: 'project-beta',
		title: 'Project Beta',
		subtitle: 'Consumer mobile web app',
		desc: 'High-traffic mobile web experience serving 500k+ monthly users. Focused on Core Web Vitals and offline capability via service workers.',
		tags: ['React', 'PWA', 'Redis'],
		color: '#050505',
	},
	{
		id: '03',
		slug: 'project-gamma',
		title: 'Project Gamma',
		subtitle: 'Real-time analytics dashboard',
		desc: 'Live analytics dashboard for ops teams. Replaced spreadsheet-based reporting with real-time charts and automated alerting.',
		tags: ['Vue.js', 'Go Fiber', 'WebSocket'],
		color: '#080808',
	},
];

export default function ProjectsSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	const backgroundColor = useTransform(
		scrollYProgress,
		[0, 0.33, 0.66, 1],
		['#030303', '#050505', '#080808', '#080808']
	);

	return (
		<div ref={containerRef} className="relative h-[300vh]">
			<motion.div
				style={{ backgroundColor }}
				className="sticky top-0 h-screen overflow-hidden flex items-center"
			>
				<div className="container mx-auto px-4 md:px-6 relative h-full">
					{projects.map((project, i) => {
						// Calculate range for this project
						const start = i / projects.length;
						const end = (i + 1) / projects.length;

						// Opacity and Y animations based on scroll
						// eslint-disable-next-line react-hooks/rules-of-hooks
						const opacity = useTransform(
							scrollYProgress,
							[start, start + 0.1, end - 0.1, end],
							[0, 1, 1, 0]
						);
						// eslint-disable-next-line react-hooks/rules-of-hooks
						const y = useTransform(
							scrollYProgress,
							[start, start + 0.1, end - 0.1, end],
							[50, 0, 0, -50]
						);

						// Image parallax
						// eslint-disable-next-line react-hooks/rules-of-hooks
						const imgY = useTransform(scrollYProgress, [start, end], ['5%', '-5%']);

						return (
							<motion.div
								key={project.id}
								style={{ opacity, y, pointerEvents: 'auto' }}
								className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-20 p-4 md:p-20 pointer-events-none"
							>
								{/* Left Content */}
								<div className="flex-1 space-y-6 max-w-xl z-10">
									<div className="relative">
										<span className="absolute -left-4 md:-left-20 -top-12 md:-top-20 text-[6rem] md:text-[10rem] font-mono text-foreground/5 select-none z-0">
											{project.id}
										</span>
										<h2 className="text-4xl md:text-7xl font-serif italic text-foreground relative z-10">
											{project.title}
										</h2>
									</div>

									<p className="text-muted font-sans text-lg md:text-xl font-light">
										{project.subtitle}
									</p>

									<p className="text-foreground/80 font-sans text-base md:text-lg leading-relaxed max-w-md">
										{project.desc}
									</p>

									<div className="flex flex-wrap gap-2">
										{project.tags.map((tag) => (
											<span
												key={tag}
												className="font-mono text-xs border border-accent/30 text-accent rounded-full px-3 py-1 bg-transparent"
											>
												{tag}
											</span>
										))}
									</div>

									<Link
										href={`/work/${project.slug}`}
										className="inline-flex items-center gap-2 text-accent hover:underline mt-4 group"
									>
										View case study{' '}
										<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</div>

								{/* Right Image Placeholder */}
								<motion.div
									style={{ y: imgY }}
									className="flex-1 w-full aspect-video bg-surface rounded-xl shadow-2xl border border-foreground/5 relative overflow-hidden group"
								>
									{/* Abstract placeholder visual */}
									<div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20" />
									<div className="absolute bottom-4 right-4 font-mono text-xs text-foreground/20">
										Placeholder for {project.title}
									</div>
								</motion.div>
							</motion.div>
						);
					})}
				</div>
			</motion.div>
		</div>
	);
}
