'use client';

import { useState, useEffect } from 'react';
import BlogCard from "../../components/BlogCard";
import CTA from "../../components/CTA";
import { databases, DATABASE_ID, BLOGS_COLLECTION_ID } from '@/lib/appwrite';
import { Query } from 'appwrite';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          BLOGS_COLLECTION_ID,
          [Query.orderDesc('$createdAt')]
        );
        setBlogs(response.documents);
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Failed to load blogs. Please check your Appwrite configuration.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <main className="bg-gradient-to-br from-amber-200/80 via-yellow-200/50 to-amber-200/70 min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
        <div className="max-w-7xl mx-auto text-center py-12 md:py-16 lg:py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-700 text-base md:text-lg">Loading blogs...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gradient-to-br from-amber-200/80 via-yellow-200/50 to-amber-200/70 min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
        <div className="max-w-7xl mx-auto text-center py-12 md:py-16 lg:py-20">
          <p className="text-red-600 text-lg md:text-xl mb-4">{error}</p>
          <p className="text-gray-600 text-sm md:text-base">
            Please ensure your Appwrite database is properly configured.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-br from-amber-200/80 via-yellow-200/50 to-amber-200/70 min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            <span className="textGradient">Vedic Wisdom</span> Blog
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-3xl mx-auto px-2">
            Explore the ancient wisdom of Vedic astrology through our comprehensive guides,
            remedies, and insights that can help you navigate life&apos;s journey with clarity and purpose.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12 md:py-16 lg:py-20">
            <p className="text-gray-600 text-lg md:text-xl">No blogs published yet.</p>
            <p className="text-gray-500 text-sm md:text-base mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            {/* Featured Blog */}
            <div className="mb-10 md:mb-12 lg:mb-16">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800">Featured Article</h2>
              <BlogCard blog={blogs[0]} featured={true} />
            </div>

            {/* All Blogs */}
            {blogs.length > 1 && (
              <div className="mb-6 md:mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800">Latest Articles</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {blogs.slice(1).map((blog) => (
                    <BlogCard key={blog.$id} blog={blog} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Call to Action */}
        <CTA />

      </div>
    </main>
  );
}