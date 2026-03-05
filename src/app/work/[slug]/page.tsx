import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function WorkPage({ params }: { params: { slug: string } }) {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
			<Link
				href="/#projects"
				className="absolute top-8 left-8 flex items-center gap-2 text-accent hover:underline"
			>
				<ArrowLeft className="w-4 h-4" /> Back to Projects
			</Link>
			<h1 className="text-4xl md:text-6xl font-serif italic mb-4">
				Case Study: {params.slug}
			</h1>
			<p className="max-w-xl text-center text-muted font-sans font-light">
				Detailed case study content will go here.
			</p>
		</div>
	);
}
