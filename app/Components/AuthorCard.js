"use client";

import Image from "next/image";
import React from "react";

const AuthorCard = ({ author }) => {
  const { name, biography, imageUrl, books } = author;

  return (
    <div className="bg-black border-4 border-white shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] p-4 flex flex-col justify-between h-full">
      <div className="flex flex-col items-center mb-4">
        {/* Author Image */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name || "Author image"}
            className="w-48 h-48 object-cover mb-4 rounded-full"
            width={128}
            height={128}
          />
        )}
        {/* Author Name */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {name || "No Name Available"}
        </h2>
        {/* Author Biography */}
        <p className="text-sm text-gray-300 mb-4 text-center">
          {biography
            ? biography.substring(0, 150) + "..."
            : "No biography available."}
        </p>
      </div>

      {/* Books List */}
      <div className="flex flex-col gap-2 mt-auto">
        {books && books.length > 0 ? (
          <div>
            <h3 className="text-lg font-semibold text-white text-center mb-2">
              Books by {name}
            </h3>
            <ul className="text-sm text-gray-300">
              {books.map((book, index) => (
                <li key={index} className="mb-1">
                  {book}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">No books available</p>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;
