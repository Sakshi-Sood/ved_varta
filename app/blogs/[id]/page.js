'use client';

import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CTA from "@/components/CTA";
import { use, useState, useEffect } from 'react';
import { databases, DATABASE_ID, BLOGS_COLLECTION_ID } from '@/lib/appwrite';

// Required for static export - returns empty array as blogs are fetched dynamically
export function generateStaticParams() {
  return [];
}

export default function BlogPost({ params }) {
  const resolvedParams = use(params);
  const blogId = resolvedParams.id;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await databases.getDocument(
          DATABASE_ID,
          BLOGS_COLLECTION_ID,
          blogId
        );
        setBlog(response);
      } catch (err) {
        setError('Unable to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  // Helper function to get image URL
  const getImageUrl = () => {
    if (!blog) return "/images/logo.jpg";

    // Check for new Hostinger URL first
    if (blog.imageUrl) {
      return blog.imageUrl;
    }

    // Fallback to old Appwrite imageId for backward compatibility
    if (blog.imageId) {
      return `${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID}/files/${blog.imageId}/view?project=${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`;
    }

    return blog.image || "/images/logo.jpg";
  };

  // Format date properly
  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <main className="bg-gradient-to-br from-amber-200/70 via-yellow-100/60 to-amber-200/70 min-h-screen py-6 md:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-12 md:py-16 lg:py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-700 text-base md:text-lg">Loading blog post...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gradient-to-br from-amber-200/70 via-yellow-100/60 to-amber-200/70 min-h-screen py-6 md:py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center py-12 md:py-16 lg:py-20">
          <div className="bg-white rounded-lg md:rounded-xl shadow-md p-6 md:p-8">
            <div className="text-orange-500 mb-4">
              <i className="fas fa-exclamation-circle text-4xl md:text-5xl" aria-hidden="true"></i>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link
              href="/blogs"
              className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
            >
              <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>
              Back to Blogs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!blog) {
    notFound();
  }

  return (
    <main className="bg-gradient-to-br from-amber-200/70 via-yellow-100/60 to-amber-200/70 min-h-screen py-4 sm:py-6 md:py-8">
      {/* Back to Blogs - Subtle Link */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-3 md:mb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 text-xs sm:text-sm font-medium transition-colors"
        >
          <i className="fas fa-arrow-left mr-2" aria-hidden="true"></i>
          All Posts
        </Link>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* White Content Container */}
        <div className="bg-white rounded-lg md:rounded-xl shadow-md p-4 sm:p-5 md:p-6 lg:p-8">
          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight tracking-tight">
            {blog.title}
          </h1>

          {/* Author Info and Meta */}
          <div className="flex items-center justify-between py-3 md:py-4 border-b border-amber-200 mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3">
              <Image
                src="/images/acharyaAnoop.jpg"
                alt="Acharya Anoop Tripathi"
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10 md:w-12 md:h-12"
              />
              <div>
                <p className="font-medium text-gray-900 text-xs sm:text-sm">Acharya Anoop Tripathi</p>
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                  <span>{blog.readTime || "5 min read"}</span>
                  <span>·</span>
                  <span>{formatDate(blog.date)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image - Right after title */}
          <div className="relative w-full mb-6 md:mb-8 rounded-lg md:rounded-xl overflow-hidden shadow-md">
            <div className="relative aspect-[2/1] sm:aspect-[5/2] md:aspect-[3/1] bg-gradient-to-br from-amber-100 to-orange-100">
              <Image
                src={getImageUrl()}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <div className="text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-[1.75] md:leading-[1.8] whitespace-pre-wrap">
              {blog.content}
            </div>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-amber-200">
              {blog.tags.map((tag, index) => (
                <Link
                  key={index}
                  href={`/blogs?tag=${tag}`}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-amber-100 hover:bg-amber-200 text-orange-700 rounded-full text-xs sm:text-sm font-medium transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

        </div>

        {/* Call to Action */}
        <div className="mt-6 md:mt-8">
          <CTA />
        </div>
      </article>
    </main>
  );
}
