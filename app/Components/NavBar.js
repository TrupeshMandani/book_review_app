import React, { useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"; // Import logout icon
import { auth, signOut } from "../utils/firebase"; // Import Firebase's auth and signOut
import Link from "next/link";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // If user is logged in, user will contain the user data
    });

    return () => {
      unsubscribe(); // Cleanup the listener when the component unmounts
    };
  }, []);

  // Handle logout confirmation
  const handleLogout = async () => {
    setShowModal(true); // Show the confirmation modal
  };

  // Handle confirm logout
  const confirmLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      setShowModal(false); // Hide the modal
      window.location.href = "/"; // Redirect to the homepage after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Handle cancel logout
  const cancelLogout = () => {
    setShowModal(false); // Hide the modal if user cancels
  };

  return (
    <nav className="bg-black w-full text-white border-4 border-white shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] font-mono p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Bookstore</div>
        <div className="flex gap-4">
          <Link
            href="/"
            className="text-white font-bold text-lg transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Home
          </Link>
          <a
            href="#books"
            className="text-white font-bold text-lg transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Books
          </a>
          <Link
            href="/authors"
            className="text-white font-bold text-lg transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Authors
          </Link>
          {user ? (
            // If the user is logged in, show "Logout" button
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-white font-bold text-lg transition-colors duration-300 ease-in-out"
            >
              <FaSignOutAlt className="text-xl" /> Logout
            </button>
          ) : (
            // If the user is logged out, show "Login" button
            <Link
              href="/loginpage"
              className="flex items-center gap-2 text-white font-bold text-lg transition-colors duration-300 ease-in-out "
            >
              <FaSignInAlt className="text-xl" /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Custom Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50">
          <div className="bg-black p-8 shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]  border-4 border-white text-center">
            <h2 className="text-white font-bold text-xl mb-4">
              Are you sure you want to log out?
            </h2>
            <div className="flex justify-center gap-6">
              <button
                onClick={confirmLogout}
                className="w-full p-3 border-2 border-white hover:bg-white hover:text-black bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 ease-in-out"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="w-full p-3 border-2 hover:bg-white hover:text-black border-white bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 ease-in-out"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
