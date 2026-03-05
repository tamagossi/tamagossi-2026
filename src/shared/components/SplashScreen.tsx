'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = [
	'Sampurasun', // Sundanese
	'Hello', // English
	'안녕하세요', // Korean
	'こんにちは', // Japanese
	'مرحبا', // Arabic
	'Hai',
];

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
	const [index, setIndex] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		// Check session storage
		const hasShown = sessionStorage.getItem('splashShown');
		if (hasShown) {
			// Use setTimeout to avoid synchronous state update warning
			setTimeout(() => {
				setIsVisible(false);
				onComplete();
			}, 0);
			return;
		}

		const interval = setInterval(() => {
			setIndex((prev) => {
				// Allow going one past the last word to trigger the exit animation
				if (prev === words.length) {
					clearInterval(interval);
					return prev;
				}
				return prev + 1;
			});
		}, 500); // Speed up for more words

		return () => clearInterval(interval);
	}, [onComplete]);

	useEffect(() => {
		// When index reaches words.length (meaning "Tamagossi" has finished its time)
		if (index === words.length) {
			const timer = setTimeout(() => {
				setIsVisible(false);
				// sessionStorage.setItem('splashShown', 'true');
				onComplete();
			}, 1500); // Wait for zoom animation
			return () => clearTimeout(timer);
		}
	}, [index, onComplete]);

	if (!isVisible) return null;

	return (
		<motion.div
			className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<div className="grid place-items-center w-full">
				<AnimatePresence>
					{index < words.length - 1 ? (
						<motion.h1
							key={words[index]}
							initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
							animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
							exit={{
								opacity: 0,
								y: -20,
								filter: 'blur(10px)',
								transition: { duration: 0.3, ease: 'easeInOut' },
							}}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="col-start-1 row-start-1 font-serif text-[3rem] md:text-[7rem] font-bold text-foreground"
						>
							{words[index]}
						</motion.h1>
					) : index === words.length - 1 ? (
						<motion.h1
							className="col-start-1 row-start-1 font-serif text-[3rem] md:text-[7rem] font-bold text-white"
							key="final"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8, ease: 'easeInOut' }}
							exit={{
								opacity: 0,
								scale: 20,
								filter: 'blur(20px)',
								transition: { duration: 0.8, ease: 'easeIn', delay: 0.8 },
							}}
						>
							Hai
						</motion.h1>
					) : null}
				</AnimatePresence>
			</div>
		</motion.div>
	);
}
