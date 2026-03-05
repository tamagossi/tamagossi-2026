'use client';

import React, { useState, useRef, useEffect } from 'react';
import SterlingGateNav from './ui/sterling-gate-nav';
import gsap from 'gsap';

export default function FloatingNav() {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const iconRef1 = useRef<SVGLineElement>(null);
	const iconRef2 = useRef<SVGLineElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			if (isOpen) {
				gsap.to(iconRef1.current, {
					rotation: 45,
					transformOrigin: 'center',
					duration: 0.3,
				});
				gsap.to(iconRef2.current, {
					rotation: -45,
					transformOrigin: 'center',
					duration: 0.3,
				});
			} else {
				gsap.to(iconRef1.current, {
					rotation: 0,
					transformOrigin: 'center',
					duration: 0.3,
				});
				gsap.to(iconRef2.current, {
					rotation: 0,
					transformOrigin: 'center',
					duration: 0.3,
				});
			}
		}, buttonRef);
		return () => ctx.revert();
	}, [isOpen]);

	return (
		<>
			<button
				ref={buttonRef}
				onClick={() => setIsOpen(!isOpen)}
				className="fixed bottom-8 right-8 z-[1001] w-12 h-12 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 backdrop-blur-md"
				aria-label={isOpen ? 'Close menu' : 'Open menu'}
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line ref={iconRef1} x1="12" y1="5" x2="12" y2="19" />
					<line ref={iconRef2} x1="5" y1="12" x2="19" y2="12" />
				</svg>
			</button>

			<SterlingGateNav isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}
