"use client";

import Link from "next/link";
import BlogPreviewCard from "../components/BlogPreviewCard";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { databases, DATABASE_ID, BLOGS_COLLECTION_ID } from "@/lib/appwrite";
import { Query } from "appwrite";

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await databases.listDocuments(
          DATABASE_ID,
          BLOGS_COLLECTION_ID,
          [Query.orderDesc("$createdAt"), Query.limit(3)]
        );
        setBlogs(response.documents);
      } catch (err) {
        console.error("Error fetching homepage blogs:", err);
        setError(
          "Failed to load latest blogs. Please check your Appwrite configuration."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 px-5 sm:px-10 lg:px-44">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="textGradient">Vedic Wisdom</span> Blog
          </h2>
          <p className="text-gray-700 sm:text-lg max-w-2xl mx-auto">
            Discover ancient Vedic insights, practical remedies, and
            astrological guidance to navigate life&apos;s journey with clarity
            and purpose.
          </p>
        </div>

        {/* Blog Preview Cards */}
        {loading ? (
          <div className="text-center py-10 mb-8">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-orange-500"></div>
            <p className="mt-3 text-gray-700">Loading latest articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10 mb-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-10 mb-8 text-gray-600">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {blogs.map((blog) => (
              <BlogPreviewCard key={blog.$id || blog.id} blog={blog} />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="flex items-center justify-center flex-col text-center">
          <Link href="/blogs">
            <Button
              text="Discover More Articles"
              icon={
                <i className="fas fa-arrow-right ml-3" aria-hidden="true"></i>
              }
              fill
              right={true}
            />
          </Link>

          <p className="text-gray-600 mt-3 text-sm">
            Explore our complete collection of Vedic astrology insights and
            remedies
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;