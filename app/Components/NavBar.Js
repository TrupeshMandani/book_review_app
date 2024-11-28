import React from "react";

const NavBar = () => {
  return (
    <nav className="brutalist-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">Bookstore</div>
        <div className="navbar-links">
          <a href="#home" className="navbar-item">
            Home
          </a>
          <a href="#books" className="navbar-item">
            Books
          </a>
          <a href="#authors" className="navbar-item">
            Authors
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
