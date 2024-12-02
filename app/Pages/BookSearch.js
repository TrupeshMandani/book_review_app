"use client";
import React, { useState, useEffect } from "react";
import BookCard from "../Components/BookCard";

const BookSearch = ({ query }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query.trim() === "") {
      setBooks([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        if (!apiKey) throw new Error("API key is missing");

        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
        );

        if (!response.ok) throw new Error("Failed to fetch books");

        const data = await response.json();
        setBooks(data.items || []);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return (
    <div className="p-8 bg-black min-h-screen">
      {loading && (
        <p className="text-center text-blue-500" aria-live="polite">
          Loading...
        </p>
      )}
      {error && (
        <p className="text-center text-red-500" aria-live="assertive">
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {!loading && books.length === 0 && query.trim() !== "" && (
        <p className="text-center text-gray-500 mt-4">No books found.</p>
      )}
    </div>
  );
};

export default BookSearch;
