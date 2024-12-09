"use client";
import React, { useState, useEffect } from "react"; // Import the BookCard component
import { fetchBooks } from "../utils/FetchAPI"; // Import the fetchBooks function
import BookCard from "../Components/BookCard";

const HomePage = ({ query = "" }) => {
  const [books, setBooks] = useState([]); // To store the fetched books
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [category, setCategory] = useState("fiction"); // Default category

  // Categories for default display (you can modify these categories)
  const categories = [
    "fiction",
    "non-fiction",
    "mystery",
    "fantasy",
    "science",
  ];

  // Fetch books when the query or category changes
  useEffect(() => {
    if (query.trim() === "" && category) {
      fetchBooksByCategory(category);
    } else if (query.trim() !== "") {
      fetchBooksByQuery(query);
    }
  }, [query, category]); // Trigger fetch when the query or category changes

  // Function to fetch books by category
  const fetchBooksByCategory = async (category) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure the API key is set in your .env.local file
      if (!apiKey) {
        throw new Error("API key is missing");
      }

      const fetchedBooks = await fetchBooks(category, apiKey); // Fetch books by category
      setBooks(fetchedBooks); // Set books data
    } catch (err) {
      console.error("Error fetching books:", err.message);
      setError("Failed to fetch books. Please try again later.");
    }

    setLoading(false);
  };

  // Function to fetch books by query
  const fetchBooksByQuery = async (query) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure the API key is set in your .env.local file
      if (!apiKey) {
        throw new Error("API key is missing");
      }

      const fetchedBooks = await fetchBooks(query, apiKey); // Fetch books by query
      setBooks(fetchedBooks); // Set books data
    } catch (err) {
      console.error("Error fetching books:", err.message);
      setError("Failed to fetch books. Please try again later.");
    }

    setLoading(false);
  };

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

      {/* Category Selection */}
      <div className="flex justify-center gap-4 mt-8 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded-md"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Books List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* No Results */}
      {!loading && books.length === 0 && query.trim() === "" && category && (
        <p className="text-center text-gray-500 mt-4">
          No books found in the "{category}" category.
        </p>
      )}
      {!loading && books.length === 0 && query.trim() !== "" && (
        <p className="text-center text-gray-500 mt-4">
          No books found for this query.
        </p>
      )}
    </div>
  );
};

export default HomePage;
