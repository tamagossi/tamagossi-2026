import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogIndexPage() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center p-8">
      <Link
        href="/"
        className="text-accent absolute top-8 left-8 flex items-center gap-2 hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Home
      </Link>
      <h1 className="mb-4 font-serif text-4xl italic md:text-6xl">Writing</h1>
      <p className="text-muted max-w-xl text-center font-sans font-light">
        List of all blog posts will go here.
      </p>
    </div>
  );
}
