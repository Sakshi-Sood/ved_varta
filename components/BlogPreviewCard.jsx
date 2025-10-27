import Link from "next/link";
import Image from "next/image";

const BlogPreviewCard = ({ blog }) => {
  return (
    <article className="bg-white/70 rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
      <Link href={`/blogs/${blog.id}`} className="h-48 relative">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {blog.tags[0]}
          </span>
        </div>
      </Link>

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

        <h3 className="text-lg font-bold text-gray-800 mb-3 hover:text-orange-500 transition-colors flex-1">
          <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
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
              {blog.author}
            </span>
          </Link>

          <Link
            href={`/blogs/${blog.id}`}
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
