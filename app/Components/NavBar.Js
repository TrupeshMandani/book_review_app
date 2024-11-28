import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-black w-full text-white border-4 border-white shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] font-mono p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Bookstore</div>
        <div className="flex gap-4">
          <a
            href="#home"
            className="text-white font-bold text-lg transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Home
          </a>
          <a
            href="#books"
            className="text-white font-bold text-lg transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Books
          </a>
          <a
            href="#authors"
            className="text-white font-bold text-lg transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Authors
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
// Correct code
