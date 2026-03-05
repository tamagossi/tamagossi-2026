'use client';

import React from 'react';
import { cn } from '@/shared/utils/cn';

interface Skill {
	id: string;
	orbitRadius: number;
	iconType: string;
	label: string;
	speed: number;
	phaseShift?: number;
}

const TechIcon = ({ type }: { type: string }) => {
	// Simple SVG placeholders for brands
	switch (type) {
		case 'typescript':
			return <span className="font-bold text-blue-500 text-xs">TS</span>;
		case 'go':
			return <span className="font-bold text-cyan-500 text-xs">GO</span>;
		case 'javascript':
			return <span className="font-bold text-yellow-400 text-xs">JS</span>;
		case 'nextjs':
			return <span className="font-bold text-white text-xs">NEXT</span>;
		case 'react':
			return <span className="font-bold text-blue-400 text-xs">RCT</span>;
		case 'vue':
			return <span className="font-bold text-green-500 text-xs">VUE</span>;
		case 'gofiber':
			return <span className="font-bold text-green-400 text-xs">FBR</span>;
		default:
			return <span className="font-bold text-gray-400 text-xs">?</span>;
	}
};

export default function OrbitingSkills() {
	const innerSkills: Skill[] = [
		{
			id: 'typescript',
			orbitRadius: 100,
			iconType: 'typescript',
			label: 'TypeScript',
			speed: 20,
		},
		{ id: 'go', orbitRadius: 100, iconType: 'go', label: 'Go', speed: 20, phaseShift: 240 },
		{
			id: 'javascript',
			orbitRadius: 100,
			iconType: 'javascript',
			label: 'JavaScript',
			speed: 20,
			phaseShift: 120,
		},
	];

	const outerSkills: Skill[] = [
		{ id: 'nextjs', orbitRadius: 180, iconType: 'nextjs', label: 'Next.js', speed: 30 },
		{
			id: 'react',
			orbitRadius: 180,
			iconType: 'react',
			label: 'React',
			speed: 30,
			phaseShift: 90,
		},
		{
			id: 'vue',
			orbitRadius: 180,
			iconType: 'vue',
			label: 'Vue / Nuxt',
			speed: 30,
			phaseShift: 180,
		},
		{
			id: 'gofiber',
			orbitRadius: 180,
			iconType: 'gofiber',
			label: 'Go Fiber',
			speed: 30,
			phaseShift: 270,
		},
	];

	return (
		<div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
			{/* Center */}
			<div className="z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-accent to-surface shadow-2xl">
				<span className="text-2xl font-bold text-white">T</span>
			</div>

			{/* Inner Ring */}
			<div className="absolute h-[200px] w-[200px] rounded-full border border-accent/40 opacity-50" />

			{innerSkills.map((skill) => (
				<OrbitingItem
					key={skill.id}
					radius={100}
					duration={skill.speed}
					angle={skill.phaseShift || 0}
				>
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface border border-accent/20 hover:border-accent transition-colors shadow-lg">
						<TechIcon type={skill.iconType} />
					</div>
				</OrbitingItem>
			))}

			{/* Outer Ring */}
			<div className="absolute h-[360px] w-[360px] rounded-full border border-surface opacity-50" />

			{outerSkills.map((skill) => (
				<OrbitingItem
					key={skill.id}
					radius={180}
					duration={skill.speed}
					reverse
					angle={skill.phaseShift || 0}
				>
					<div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface border border-accent/20 hover:border-accent transition-colors shadow-lg">
						<TechIcon type={skill.iconType} />
					</div>
				</OrbitingItem>
			))}
		</div>
	);
}

function OrbitingItem({
	children,
	radius,
	duration,
	reverse = false,
	angle = 0,
}: {
	children: React.ReactNode;
	radius: number;
	duration: number;
	delay?: number;
	reverse?: boolean;
	angle?: number;
}) {
	return (
		<div
			className={cn('absolute flex items-center justify-center')}
			style={{
				width: radius * 2,
				height: radius * 2,
				transform: `rotate(${angle}deg)`, // Initial offset
			}}
		>
			<div
				className={cn('absolute w-full h-full animate-spin')}
				style={{
					animationDuration: `${duration}s`,
					animationDirection: reverse ? 'reverse' : 'normal',
				}}
			>
				<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<div
						className="animate-spin"
						style={{
							animationDuration: `${duration}s`,
							animationDirection: reverse ? 'normal' : 'reverse',
						}}
					>
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
