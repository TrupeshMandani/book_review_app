"use client";

import Image from "next/image";
import React from "react";

const BookCard = ({ book }) => {
  const { title, authors, description, imageLinks, saleInfo } = book.volumeInfo;
  const { buyLink } = saleInfo || {};

  // Function to handle PDF search
  const handleSearchPDF = () => {
    if (title) {
      const searchQuery = `${title} filetype:pdf`;
      const luckySearchURL = `https://www.google.com/search?btnI=I&q=${encodeURIComponent(
        searchQuery
      )}`;
      window.open(luckySearchURL, "_blank");
    } else {
      alert("No title available to search for PDFs.");
    }
  };

  return (
    <div className="bg-black border-4 border-white align-middle transform transition-transform duration-300 hover:scale-105 focus:scale-105 active:scale-105 hover:shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] p-4 flex flex-col justify-between h-full">
      <div className="flex flex-col items-center mb-4">
        {/* Book Image */}
        {imageLinks?.thumbnail && (
          <Image
            src={imageLinks.thumbnail}
            alt={title || "Book cover image"}
            className="w-48 h-72 object-cover mb-4 rounded-md"
            width={128}
            height={192}
          />
        )}
        {/* Book Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {title || "No Title"}
        </h2>
        {/* Book Authors */}
        {authors && (
          <p className="text-sm text-gray-400 text-center mb-2">
            {authors.join(", ")}
          </p>
        )}
        {/* Book Description */}
        <p className="text-sm text-gray-300 mb-4 text-center">
          {description
            ? description.substring(0, 100) + "..."
            : "No description available."}
        </p>
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col gap-3 mt-auto">
        <button
          onClick={() => {
            if (title) {
              const amazonSearchURL = `https://www.amazon.com/s?k=${encodeURIComponent(
                title
              )}`;
              window.open(amazonSearchURL, "_blank");
            } else {
              alert("No title available to search on Amazon.");
            }
          }}
          className="bg-black text-white border-2 border-white py-2 px-4 hover:bg-white hover:text-black transition-all m-3 duration-300 hover:shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]"
        >
          Purchase on Amazon
        </button>

        <button
          onClick={handleSearchPDF}
          className="bg-black text-white border-2 border-white py-2 px-4 hover:bg-white hover:text-black  transition-all m-3 duration-300 hover:shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]"
        >
          Read / Download E-Book
        </button>
      </div>
    </div>
  );
};

export default BookCard;
