"use client";
import React, { useState, useEffect } from "react";
import BookCard from "../app/Components/BookCard"; // Import the BookCard component
import { fetchBooks } from "../app/utils/FetchAPI"; // Import the fetchBooks function

const BookSearch = ({ query = "" }) => {
  // Default query to an empty string if it's undefined or null
  const [books, setBooks] = useState([]); // To store the fetched books
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch books when the query changes
  useEffect(() => {
    if (query.trim() === "") return; // Skip fetching if query is empty

    const getBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure the API key is set in your .env.local file

        // Check for the API key
        if (!apiKey) {
          throw new Error("API key is missing");
        }

        const fetchedBooks = await fetchBooks(query, apiKey); // Fetch books using the function from FetchAPI.js
        setBooks(fetchedBooks); // Set books data
      } catch (err) {
        console.error("Error fetching books:", err.message);
        setError("Failed to fetch books. Please try again later.");
      }

      setLoading(false);
    };

    getBooks();
  }, [query]); // Trigger fetch when the query changes

  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Loading State */}
      {loading && (
        <div className="loader justify-center mx-auto">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      )}

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
