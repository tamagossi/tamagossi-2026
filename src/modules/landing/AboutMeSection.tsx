'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import { TextGradientScroll } from '@/shared/components/ui/text-gradient-scroll';

export default function AboutMeSection() {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	return (
		<div ref={containerRef} className="h-[250vh] relative z-10 bg-background">
			<div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
				<div className="container px-8 md:px-12 lg:px-4">
					<div className="mx-auto max-w-4xl">
						<TextGradientScroll
							text="I am a Product Engineering. Currently working as a Chapter Lead at Staffinc Group, specializing in Next.js, React, and building high-performance web applications. With over 8 years of experience across fintech, education, and workforce management sectors, I focus on domain-driven design, improving developer experience, and fostering technical leadership within teams."
							className="font-sans text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-center justify-center"
							manualProgress={scrollYProgress}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
