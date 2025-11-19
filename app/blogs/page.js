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
      <main className="bg-gradient-to-br from-amber-200/80 via-yellow-200/50 to-amber-200/70 min-h-screen px-10 py-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-700 text-lg">Loading blogs...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-gradient-to-br from-amber-200/80 via-yellow-200/50 to-amber-200/70 min-h-screen px-10 py-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <p className="text-gray-600">
            Please ensure your Appwrite database is properly configured.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gradient-to-br from-amber-200/80 via-yellow-200/50 to-amber-200/70 min-h-screen px-10 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="textGradient">Vedic Wisdom</span> Blog
          </h1>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto">
            Explore the ancient wisdom of Vedic astrology through our comprehensive guides,
            remedies, and insights that can help you navigate life&apos;s journey with clarity and purpose.
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-xl">No blogs published yet.</p>
            <p className="text-gray-500 mt-2">Check back soon for new content!</p>
          </div>
        ) : (
          <>
            {/* Featured Blog */}
            <div className="mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Featured Article</h2>
              <BlogCard blog={blogs[0]} featured={true} />
            </div>

            {/* All Blogs */}
            {blogs.length > 1 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Latest Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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