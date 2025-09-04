"use client";

import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ news }) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Gambar */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          src={`http://localhost:5000${news.image}`}
          alt={news.title}
          fill
          unoptimized
          className="object-cover grayscale hover:grayscale-0 transition duration-500 ease-in-out"
        />
      </div>

      {/* Konten */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
          {news.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 flex-grow">
          {news.shortDesc || news.summary}
        </p>

        <Link
          href={`/berita/${news._id}`}
          className="mt-2 text-xs sm:text-sm font-medium text-blue-600 hover:underline"
        >
          {`Selengkapnya →`}
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
