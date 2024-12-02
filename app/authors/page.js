"use client";
import { fetchAuthors } from "../utils/FetchAPI";
import AuthorCard from "../Components/AuthorCard";
import { useState, useEffect } from "react";

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await fetchAuthors();
        setAuthors(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading authors:", error);
        setLoading(false);
      }
    };

    loadAuthors();
  }, []);

  return (
    <div className="p-8 bg-black min-h-screen">
      {loading ? (
        <p className="text-center text-blue-500">Loading authors...</p>
      ) : authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <p className="text-center text-white">No authors found.</p>
      )}
    </div>
  );
};

export default AuthorPage;
