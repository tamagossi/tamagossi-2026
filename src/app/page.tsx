'use client';

import BlogTeaser from '@/modules/landing/BlogTeaser';
import ExperienceSection from '@/modules/landing/ExperienceSection';
import AboutMeSection from '@/modules/landing/AboutMeSection';
import FloatingNav from '@/shared/components/FloatingNav';
import Footer from '@/modules/landing/Footer';
import HeroSection from '@/modules/landing/HeroSection';
import ProjectsSection from '@/modules/landing/ProjectsSection';
import SkillsSection from '@/modules/landing/SkillsSection';
import SplashScreen from '@/shared/components/SplashScreen';
import { useState, useEffect } from 'react';

export default function Home() {
	const [isSplashComplete, setIsSplashComplete] = useState(false);

	// Check if splash was already shown in this session to prevent flicker
	useEffect(() => {
		const hasShown = sessionStorage.getItem('splashShown');
		if (hasShown) {
			// Use setTimeout to avoid synchronous state update warning
			setTimeout(() => {
				setIsSplashComplete(true);
			}, 0);
		}
	}, []);

	return (
		<main className="relative min-h-screen bg-background text-foreground">
			<SplashScreen onComplete={() => setIsSplashComplete(true)} />

			<div className={!isSplashComplete ? 'pointer-events-none' : ''}>
				<section id="hero">
					<HeroSection startAnimation={isSplashComplete} />
				</section>

				<section id="about">
					<AboutMeSection />
				</section>

				<section id="experience">
					<ExperienceSection />
				</section>

				<section id="projects">
					<ProjectsSection />
				</section>

				<section id="skills">
					<SkillsSection />
				</section>

				<section id="blog">
					<BlogTeaser />
				</section>

				<Footer />
			</div>

			<FloatingNav />
		</main>
	);
}
