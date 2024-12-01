"use client";
import React, { useState, useEffect } from "react";
import BookCard from "../Components/BookCard"; // Import the BookCard component

const BookSearch = ({ query }) => {
  const [books, setBooks] = useState([]); // To store the fetched books
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch books when the query changes
  useEffect(() => {
    if (query.trim() === "") return; // Skip fetching if query is empty

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await response.json();

        if (data.items) {
          setBooks(data.items);
        } else {
          setBooks([]);
        }
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
      }

      setLoading(false);
    };

    fetchBooks();
  }, [query]); // Trigger the fetch when the query changes

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Loading State */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}

      {/* Error State */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* No Results */}
      {!loading && books.length === 0 && query.trim() !== "" && (
        <p className="text-center text-gray-500 mt-4">No books found.</p>
      )}
    </div>
  );
};

export default BookSearch;
