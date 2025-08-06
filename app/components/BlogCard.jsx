import Link from "next/link";
import Image from "next/image";

const BlogCard = ({ blog, featured = false }) => {
  const cardClasses = featured
    ? "bg-white/70 rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300 lg:flex"
    : "bg-white/70 rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-all duration-300 h-full flex flex-col";

  const imageClasses = featured
    ? "lg:w-1/2 h-64 lg:h-auto relative"
    : "h-48 relative";

  const contentClasses = featured
    ? "p-8 lg:w-1/2 flex flex-col justify-center"
    : "p-6 flex-1 flex flex-col";

  return (
    <article className={cardClasses}>
      <div className={imageClasses}>
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

      <div className={contentClasses}>
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

        <h3
          className={`font-bold text-gray-800 mb-3 hover:text-orange-600 transition-colors ${
            featured ? "text-2xl lg:text-3xl" : "text-xl"
          }`}
        >
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
        </h3>

        <p
          className={`text-gray-700 mb-4 ${
            featured ? "text-lg" : "text-base"
          } flex-1`}
        >
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-3">
              {blog.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <span className="text-gray-700 font-medium">{blog.author}</span>
          </div>

          <Link
            href={`/blogs/${blog.id}`}
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center"
          >
            Read More
            <i className="fas fa-arrow-right ml-2" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {blog.tags.slice(1).map((tag, index) => (
            <span
              key={index}
              className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
