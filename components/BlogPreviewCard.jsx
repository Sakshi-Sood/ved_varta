import Link from "next/link";
import Image from "next/image";

const BlogPreviewCard = ({ blog }) => {
  const blogId = blog.$id || blog.id;

  const getImageUrl = () => {
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

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <article className="bg-white/70 rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <Link href={`/blogs/${blogId}`} className="h-48 relative">
        <Image
          src={getImageUrl()}
          alt={blog.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {blog.tags?.[0] || "Blog"}
          </span>
        </div>
      </Link>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <i className="far fa-calendar-alt mr-2" aria-hidden="true"></i>
            {formatDate(blog.date || blog.$createdAt)}
          </span>
          <span className="flex items-center">
            <i className="far fa-clock mr-2" aria-hidden="true"></i>
            {blog.readTime || "5 min read"}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-orange-500 transition-colors flex-1">
          <Link href={`/blogs/${blogId}`}>{blog.title}</Link>
        </h3>

        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <Link href="/about" className="flex items-center">
            <Image
              src="/images/acharyaAnoop.jpg"
              alt="Author Image"
              width={32}
              height={32}
              className="rounded-full mr-2 object-cover hover:scale-110 transition-transform duration-300"
            />
            <span className="text-gray-700 font-medium text-xs hover:text-orange-500 transition-all duration-300">
              {blog.author || "Acharya Anoop Tripathi"}
            </span>
          </Link>

          <Link
            href={`/blogs/${blogId}`}
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center"
          >
            Read More
            <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPreviewCard;
