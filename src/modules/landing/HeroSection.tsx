'use client';

import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { useEffect, useRef } from 'react';
import ElegantShape from '../../shared/components/ui/shape-hero';
import { ArrowDown } from 'lucide-react';

export default function HeroSection({ startAnimation = true }: { startAnimation?: boolean }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll();
	const yParallax = useTransform(scrollY, [0, 1000], [0, 400]);

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig = { stiffness: 80, damping: 20 };
	const x = useSpring(mouseX, springConfig);
	const y = useSpring(mouseY, springConfig);

	const gradientBackground = useTransform(
		[x, y],
		([latestX, latestY]) =>
			`radial-gradient(600px circle at ${latestX}px ${latestY}px, var(--accent-glow), transparent 40%)`
	);

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				mouseX.set(e.clientX - rect.left);
				mouseY.set(e.clientY - rect.top);
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, [mouseX, mouseY]);

	const fadeUpVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: (i: number) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: 0.3 + i * 0.15,
				duration: 1,
				ease: [0.25, 0.4, 0.25, 1] as const,
			},
		}),
	};

	return (
		<motion.div
			ref={containerRef}
			style={{ y: yParallax }}
			className="relative min-h-screen w-full overflow-hidden bg-background flex flex-col items-center justify-center"
		>
			{/* Cursor Glow */}
			<motion.div
				className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
				style={{ background: gradientBackground }}
			/>

			{/* Floating Shapes */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				{startAnimation && (
					<>
						<ElegantShape
							delay={0.3}
							width={600}
							height={140}
							rotate={20}
							gradient="from-accent/10"
							className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
						/>

						<ElegantShape
							delay={0.5}
							width={500}
							height={120}
							rotate={-15}
							gradient="from-surface/60"
							className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
						/>
						<ElegantShape
							delay={0.4}
							width={300}
							height={80}
							rotate={20}
							gradient="from-accent/5"
							className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
						/>
						<ElegantShape
							delay={0.6}
							width={200}
							height={60}
							rotate={20}
							gradient="from-surface/40"
							className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
						/>
						<ElegantShape
							delay={0.5}
							width={140}
							height={600}
							rotate={0}
							gradient="from-accent/20"
							className="hidden lg:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
						/>

						<ElegantShape
							delay={0.7}
							width={150}
							height={40}
							rotate={-25}
							gradient="from-accent/5"
							className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
						/>

						<ElegantShape
							delay={0.8}
							width={150}
							height={40}
							rotate={-80}
							gradient="from-accent/10"
							className="hidden lg:block right-[20%] bottom-[50%]"
						/>
					</>
				)}
			</div>

			{/* Top Right Badge */}
			<motion.div
				initial={{ x: 30, opacity: 0 }}
				animate={startAnimation ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
				transition={{ delay: 1.4, duration: 0.8 }}
				className="absolute top-8 right-8 flex items-center gap-2 font-mono text-xs md:text-sm text-accent"
			>
				<div className="relative flex h-2 w-2">
					<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
					<span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
				</div>
				Open to remote · EU / US
			</motion.div>

			{/* Center Content */}
			<div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
				<div className="max-w-4xl mx-auto">
					<motion.div
						custom={0}
						variants={fadeUpVariants}
						initial="hidden"
						animate={startAnimation ? 'visible' : 'hidden'}
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/50 border border-surface mb-8 md:mb-12"
					>
						<span className="text-muted text-xs md:text-sm font-mono tracking-wide uppercase">
							Chapter Lead Product Engineer
						</span>
					</motion.div>

					<motion.h1
						custom={1}
						variants={fadeUpVariants}
						initial="hidden"
						animate={startAnimation ? 'visible' : 'hidden'}
						className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-foreground mb-6 md:mb-8 tracking-tight"
					>
						Tamagossi
					</motion.h1>

					<motion.h3
						custom={2}
						variants={fadeUpVariants}
						initial="hidden"
						animate={startAnimation ? 'visible' : 'hidden'}
						className="text-3xl md:text-5xl font-serif font-semibold text-foreground/80 mb-2 md:mb-4 tracking-tight"
					>
						I build products, I lead teams.
					</motion.h3>

					<motion.h2
						custom={4}
						variants={fadeUpVariants}
						initial="hidden"
						animate={startAnimation ? 'visible' : 'hidden'}
						className="text-2xl md:text-4xl font-serif font-semibold text-accent-gradient mb-8 tracking-tight"
					>
						Ship things that matter.
					</motion.h2>

					<motion.p
						custom={5}
						variants={fadeUpVariants}
						initial="hidden"
						animate={startAnimation ? 'visible' : 'hidden'}
						className="text-base md:text-xl text-muted font-sans font-light max-w-2xl mx-auto leading-relaxed mt-8"
					>
						Product engineer and chapter lead based in Bandung.
					</motion.p>
				</div>
			</div>

			{/* Scroll Hint */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
				transition={{ delay: 2, duration: 1 }}
				className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
			>
				<span className="font-mono text-xs tracking-widest uppercase">scroll</span>
				<ArrowDown className="w-4 h-4 animate-bounce" />
			</motion.div>

			{/* Bottom Gradient Fade */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background via-transparent to-transparent pointer-events-none"></div>
		</motion.div>
	);
}
