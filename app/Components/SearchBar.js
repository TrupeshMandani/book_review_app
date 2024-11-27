"use client";

import React from "react";

const SearchBar = () => {
  return (
    <div className="brutalist-container">
      <input
        placeholder="TYPE HERE"
        className="brutalist-input smooth-type"
        type="text"
      />
      <label className="brutalist-label">SEARCH BOOK</label>
    </div>
  );
};

export default SearchBar;
