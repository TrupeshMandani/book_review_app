"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="brutalist-container">
      <input
        placeholder="SEARCH HERE"
        className="brutalist-input smooth-type"
        type="text"
      />
      <FaSearch className="absolute right-7 top-1/2 transform size-4 -translate-y-1/2 text-black" />
    </div>
  );
};

export default SearchBar;
