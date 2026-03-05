'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const posts = [
	{
		title: 'Why I stopped writing unit tests first',
		date: 'Feb 2025',
		readTime: '6 min',
		slug: 'unit-tests',
	},
	{
		title: 'Designing Go Fiber middleware the right way',
		date: 'Jan 2025',
		readTime: '8 min',
		slug: 'go-fiber-middleware',
	},
	{
		title: "What 'Chapter Lead' actually means day to day",
		date: 'Dec 2024',
		readTime: '5 min',
		slug: 'chapter-lead',
	},
];

export default function BlogTeaser() {
	return (
		<section className="bg-background py-20 md:py-32">
			<div className="container mx-auto px-4 md:px-6">
				<h2 className="text-5xl md:text-7xl font-serif italic text-foreground mb-12 md:mb-20">
					Writing
				</h2>

				<div className="space-y-0 divide-y divide-foreground/10 border-t border-b border-foreground/10">
					{posts.map((post, i) => (
						<motion.div
							key={post.slug}
							initial={{ opacity: 0, x: -20 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							transition={{ delay: i * 0.1 }}
							className="group"
						>
							<Link
								href={`/blog/${post.slug}`}
								className="flex flex-col md:flex-row md:items-center justify-between py-8 md:py-12 group-hover:bg-accent/5 transition-colors px-4"
							>
								<h3 className="text-xl md:text-3xl font-sans font-light text-foreground group-hover:text-accent transition-colors mb-2 md:mb-0">
									{post.title}
								</h3>
								<div className="flex items-center gap-4 text-sm md:text-base font-mono text-foreground/40">
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
						className="inline-flex items-center gap-2 font-mono text-accent hover:underline"
					>
						All posts <ArrowRight className="w-4 h-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
