import Link from "next/link";
import Image from "next/image";

const BlogPreviewCard = ({ blog }) => {
  return (
    <article className="bg-white/70 rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <div className="h-48 relative">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {blog.tags[0]}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="flex items-center">
            <i className="far fa-calendar-alt mr-2" aria-hidden="true"></i>
            {blog.date}
          </span>
          <span className="flex items-center">
            <i className="far fa-clock mr-2" aria-hidden="true"></i>
            {blog.readTime}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-orange-600 transition-colors flex-1">
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h3>

        <p className="text-gray-700 text-base mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
              {blog.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="text-gray-700 font-medium text-sm">
              {blog.author}
            </span>
          </div>

          <Link
            href={`/blogs/${blog.id}`}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center"
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
