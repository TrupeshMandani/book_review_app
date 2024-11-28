/**
 * The SearchBar component in React renders a search input field with a search icon on the right side.
 * @returns The SearchBar component is being returned. It consists of an input field with a placeholder
 * "SEARCH HERE" and a search icon from the FaSearch component. The input field has specific styling
 * classes applied to it for appearance and functionality.
 */
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="relative w-[250px] font-mono">
      <input
        placeholder="SEARCH HERE"
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
