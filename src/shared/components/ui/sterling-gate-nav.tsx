'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import { cn } from '@/shared/utils/cn';

interface SterlingGateNavProps {
	isOpen: boolean;
	onClose: () => void;
}

const links = [
	{ label: 'Work', href: '/#projects' },
	{ label: 'Writing', href: '/#blog' },
	{ label: 'About', href: '/about' },
	{ label: 'Contact', href: 'mailto:hello@tamagossi.dev' },
];

export default function SterlingGateNav({ isOpen, onClose }: SterlingGateNavProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const panel1Ref = useRef<HTMLDivElement>(null);
	const panel2Ref = useRef<HTMLDivElement>(null);
	const panel3Ref = useRef<HTMLDivElement>(null);
	const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (isOpen) {
				gsap.set(containerRef.current, { display: 'block' });

				// Panels
				gsap.to([panel1Ref.current, panel2Ref.current, panel3Ref.current], {
					xPercent: 0,
					duration: 0.8,
					stagger: 0.1,
					ease: 'power3.inOut',
				});

				// Links
				gsap.fromTo(
					linkRefs.current,
					{ yPercent: 140, rotate: 10, opacity: 0 },
					{
						yPercent: 0,
						rotate: 0,
						opacity: 1,
						duration: 0.8,
						stagger: 0.05,
						delay: 0.4,
						ease: 'power3.out',
					}
				);
			} else {
				// Reverse
				gsap.to([panel3Ref.current, panel2Ref.current, panel1Ref.current], {
					xPercent: 101,
					duration: 0.6,
					stagger: 0.05,
					ease: 'power3.inOut',
					onComplete: () => {
						gsap.set(containerRef.current, { display: 'none' });
					},
				});
			}
		}, containerRef);

		return () => ctx.revert();
	}, [isOpen]);

	return (
		<div ref={containerRef} className="fixed inset-0 z-[1000] hidden">
			{/* Overlay/Backdrop - Click to close */}
			<div
				className={cn(
					'absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300',
					isOpen ? 'opacity-100' : 'opacity-0'
				)}
				onClick={onClose}
			/>

			{/* Panels */}
			<div
				ref={panel1Ref}
				className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-background translate-x-full z-10"
			/>
			<div
				ref={panel2Ref}
				className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-zinc-950 translate-x-full z-20"
			/>
			<div
				ref={panel3Ref}
				className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-surface translate-x-full z-30 flex flex-col justify-center px-12 md:px-24"
			>
				<nav className="flex flex-col space-y-4 overflow-hidden py-4">
					{links.map((link, i) => (
						<div key={link.label} className="overflow-hidden">
							<Link
								href={link.href}
								onClick={onClose}
								ref={(el) => {
									linkRefs.current[i] = el;
								}}
								className="block font-serif text-[4rem] md:text-[6rem] italic text-foreground hover:text-accent transition-colors duration-200 leading-tight origin-left"
							>
								{link.label}
							</Link>
						</div>
					))}
				</nav>

				<div className="mt-12 flex gap-8 text-muted font-mono text-sm">
					<a
						href="mailto:hello@tamagossi.dev"
						className="hover:text-accent transition-colors"
					>
						hello@tamagossi.dev
					</a>
					<a href="#" className="hover:text-accent transition-colors">
						GitHub
					</a>
					<a href="#" className="hover:text-accent transition-colors">
						LinkedIn
					</a>
				</div>
			</div>
		</div>
	);
}
