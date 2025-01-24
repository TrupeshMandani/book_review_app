// This is the home page 
"use client";
import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth
import { fetchBooks } from "../utils/FetchAPI"; // Import the fetchBooks function
import BookCard from "../Components/BookCard";

const HomePage = ({ query = "" }) => {
  const [books, setBooks] = useState([]); // To store the fetched books
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [username, setUsername] = useState(null); // User's name

  const auth = getAuth();

  // Fetch books when the query changes
  useEffect(() => {
    fetchRecommendedBooks();
  }, []); // Fetch books on component mount

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email);
      } else {
        setUsername(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [auth]);

  // Function to fetch recommended books
  const fetchRecommendedBooks = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure the API key is set in your .env.local file
      if (!apiKey) {
        throw new Error("API key is missing");
      }

      const fetchedBooks = await fetchBooks("recommended", apiKey); // Fetch recommended books
      setBooks(fetchedBooks); // Set books data
    } catch (err) {
      console.error("Error fetching books:", err.message);
      setError("Failed to fetch books. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Welcome Message */}
      <div className="text-left font-mono font-bold text-white text-2xl mb-6">
        Welcome{username ? `, ${username.split(" ")[0]}` : ""}!
      </div>

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

      {/* Recommended Books */}
      <div>
        <h2 className="text-white text-xl font-mono font-bold mb-4">
          Recommended Books
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* No Results */}
        {!loading && books.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No recommended books available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
