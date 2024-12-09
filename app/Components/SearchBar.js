import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Debounce the search to call `onSearch` after 300ms of inactivity
    clearTimeout(window.debounceTimeout);
    window.debounceTimeout = setTimeout(() => {
      onSearch(value); // Call onSearch after the user stops typing
    }, 300);
  };

  return (
    <div className="relative w-[250px] mx-auto">
      <input
        placeholder="SEARCH HERE"
        value={searchTerm}
        onChange={handleChange}
        className="w-full p-4 pr-12 text-xl font-bold text-black bg-white border-4 border-black outline-none transition-all duration-300 ease-in-out shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]"
        type="text"
      />
      <div className="absolute right-7 top-1/2 transform -translate-y-1/2 text-black text-2xl">
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
