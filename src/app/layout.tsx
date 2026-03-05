import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'Tamagossi — Chapter Lead Product Engineer',
	description:
		'Full-stack engineer and chapter lead based in Jakarta. Building products with Next.js, React, Go, and Go Fiber. Open to remote opportunities in EU and US.',
	openGraph: {
		title: 'Tamagossi',
		description: 'Chapter Lead Product Engineer · Jakarta · Remote-ready',
		url: 'https://tamagossi.dev',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	);
}
