import Button from "@/app/components/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-gradient-to-b from-yellow-100 via-orange-100 to-amber-100 min-h-screen px-10 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold textGradient mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Blog Post Not Found</h2>
          <p className="text-gray-700 text-lg mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="bg-white/70 rounded-xl p-8 border border-amber-200">
          <div className="flex justify-center space-x-4">
            <Link
              href="/blogs"
            >
              <Button text="View All Blogs" fill />
            </Link>
            <Link
              href="/"
            >
              <Button text="Go Home" />
            </Link>
          </div>
        </div>
      </div>``
    </main>
  );
}
