"use client";
import { fetchAuthors } from "../utils/FetchAPI";
import AuthorCard from "../Components/AuthorCard";
import { useState, useEffect } from "react";

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // Store the search query

  // Update the search query
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  // Fetch authors based on search query
  useEffect(() => {
    if (query.trim() === "") {
      setAuthors([]); // Clear authors if query is empty
      return;
    }

    const loadAuthors = async () => {
      setLoading(true);
      try {
        const data = await fetchAuthors(query, process.env.NEXT_PUBLIC_API_KEY); // Pass the query to the fetch function
        setAuthors(data);
      } catch (error) {
        console.error("Error loading authors:", error);
        setAuthors([]); // In case of error, clear the authors list
      }
      setLoading(false);
    };

    loadAuthors();
  }, [query]); // Trigger fetch whenever the query changes

  return (
    <div className="p-8 bg-black min-h-screen">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          placeholder="Search authors..."
          className="p-2 rounded-lg w-full"
        />
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-blue-500">Loading authors...</p>
      )}

      {/* Display Authors */}
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-white">No authors found.</p>
      )}
    </div>
  );
};

export default AuthorPage;
