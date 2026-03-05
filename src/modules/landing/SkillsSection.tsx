'use client';

import React from 'react';
import OrbitingSkills from '../../shared/components/ui/orbiting-skills';

const skills = {
	Languages: ['TypeScript', 'Go', 'JavaScript'],
	Frontend: ['Next.js', 'React', 'Vue', 'Nuxt', 'Tailwind'],
	Backend: ['Go Fiber', 'Node.js', 'REST', 'WebSocket'],
	Infra: ['Docker', 'PostgreSQL', 'Redis', 'Git'],
};

export default function SkillsSection() {
	return (
		<section className="min-h-screen bg-background flex items-center justify-center py-20 overflow-hidden">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
					{/* Left Column: Text */}
					<div className="space-y-12">
						<h2 className="text-5xl md:text-7xl font-serif italic text-foreground">
							What I work with
						</h2>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
							{Object.entries(skills).map(([category, items]) => (
								<div key={category} className="space-y-4">
									<h3 className="font-mono text-accent text-sm uppercase tracking-wider">
										{category}
									</h3>
									<ul className="space-y-2">
										{items.map((item) => (
											<li
												key={item}
												className="text-foreground/80 font-sans font-light text-lg"
											>
												{item}
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					</div>

					{/* Right Column: Orbiting Skills */}
					<div className="flex justify-center items-center relative">
						{/* Gradient glow behind orbit */}
						<div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
						<OrbitingSkills />
					</div>
				</div>
			</div>
		</section>
	);
}
