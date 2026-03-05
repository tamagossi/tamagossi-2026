'use client';

import Link from 'next/link';
import { Github, Linkedin, FileText } from 'lucide-react';

export default function Footer() {
	return (
		<footer className="bg-background py-20 md:py-32 border-t border-foreground/5">
			<div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
				<h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-4">
					Let&apos;s work together.
				</h2>

				<p className="text-muted font-sans font-light text-lg md:text-xl max-w-xl mb-4">
					Available for remote full-time or contract.
					<br />
					Based in Jakarta (UTC+7). Async-friendly.
				</p>

				<a
					href="mailto:hello@tamagossi.dev"
					className="text-xl lg:text-2xl font-mono text-accent hover:underline decoration-2 underline-offset-8 mb-16 transition-all"
				>
					hello@tamagossi.dev
				</a>

				<div className="flex items-center gap-8 mb-20">
					<Link
						href="https://github.com/tamagossi"
						target="_blank"
						className="text-muted hover:text-accent transition-colors"
					>
						<span className="sr-only">GitHub</span>
						<Github className="w-6 h-6" />
					</Link>
					<Link
						href="https://linkedin.com/in/tamagossi"
						target="_blank"
						className="text-muted hover:text-accent transition-colors"
					>
						<span className="sr-only">LinkedIn</span>
						<Linkedin className="w-6 h-6" />
					</Link>
					<Link href="/resume" className="text-muted hover:text-accent transition-colors">
						<span className="sr-only">Resume</span>
						<FileText className="w-6 h-6" />
					</Link>
				</div>

				<div className="w-full border-t border-foreground/5 pt-8">
					<p className="font-mono text-xs text-foreground/30">© Tamagossi 2026</p>
				</div>
			</div>
		</footer>
	);
}
