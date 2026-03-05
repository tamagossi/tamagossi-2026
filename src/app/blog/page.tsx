import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BlogIndexPage() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
			<Link
				href="/"
				className="absolute top-8 left-8 flex items-center gap-2 text-accent hover:underline"
			>
				<ArrowLeft className="w-4 h-4" /> Back to Home
			</Link>
			<h1 className="text-4xl md:text-6xl font-serif italic mb-4">Writing</h1>
			<p className="max-w-xl text-center text-muted font-sans font-light">
				List of all blog posts will go here.
			</p>
		</div>
	);
}
