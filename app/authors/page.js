"use client";
import { fetchAuthors } from "../utils/FetchAPI";
import AuthorCard from "../Components/AuthorCard";
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import SearchBar from "../Components/SearchBar";

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(""); // Store the search query

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
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Top Bar: NavBar and SearchBar */}
      <div className="flex justify-between items-start w-full p-4">
        <div className="w-full">
          <NavBar />
        </div>
        <div className="px-5 py-1">
          <SearchBar onSearch={setQuery} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
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
          !loading && (
            <p className="text-center text-white">No authors found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default AuthorPage;
