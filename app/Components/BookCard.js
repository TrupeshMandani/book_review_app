"use client";
import React from "react";

const BookCard = ({ book }) => {
  const { title, authors, description, imageLinks, saleInfo } = book.volumeInfo;
  const { buyLink } = saleInfo || {};

  return (
    <div className="bg-black border-4 border-white shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]  p-4 flex flex-col justify-between">
      <div className="flex flex-col items-center mb-4">
        {/* Book Image */}
        {imageLinks?.thumbnail && (
          <img
            src={imageLinks.thumbnail}
            alt={title}
            className="w-48 h-72 object-cover mb-4 rounded-md"
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

      {/* Buy Link and Price */}
      {buyLink ? (
        <div className="mt-4 flex flex-col items-center">
          {saleInfo.listPrice && saleInfo.listPrice.amount && (
            <p className="text-lg font-bold text-blue-500 mb-2">
              ${saleInfo.listPrice.amount}
            </p>
          )}
          <a
            href={buyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-300"
          >
            Buy this Book
          </a>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          Not available for purchase
        </p>
      )}
    </div>
  );
};

export default BookCard;
