"use client";
import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";
import BookSearch from "../pages/BookSearch";
import HomePage from "./homepage/page";

export default function Home() {
  const [query, setQuery] = useState(""); // State to manage the query

  // Function to handle search input change
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery); // Update the query state with the search term
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start w-full p-4">
          <div className="w-full">
            <NavBar />
          </div>
          <div className="px-5 py-1">
            {/* Pass the handleSearch function to SearchBar */}
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow">
        {query.trim() ? (
          <div>
            {/* Search results section */}
            <h2 className="text-3xl text-center mt-8 text-white font-mono font-bold">
              Search Results
            </h2>
            <BookSearch query={query} />
          </div>
        ) : (
          <div>
            {/* Recommended Books section */}

            <HomePage />
          </div>
        )}
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
