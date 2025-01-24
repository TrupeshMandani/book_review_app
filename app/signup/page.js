// this is the sign up page for user when they havent logged in to the web site 
"use client";
import React, { useState } from "react";
import { auth, createUserWithEmailAndPassword } from "../utils/firebase"; // Import firebase functions
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Use router to navigate to the home page after sign-up

  // Handle user sign up
  const handleSignUp = async () => {
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Create the user account with email and password
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to the home page after successful sign-up
    } catch (error) {
      setError(error.message); // Set error message if there's an issue with Firebase
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8 text-white font-mono">
      {/* Sign Up Form */}
      <div className="w-full max-w-md bg-black p-8 border-4 border-white shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Sign Up
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-white bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-white bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border-2 border-white bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Sign-Up Button */}
        <button
          onClick={handleSignUp}
          className="w-full p-3 border-2 border-white hover:bg-white hover:text-black bg-black text-white placeholder-gray-500 shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] focus:ring-2 focus:ring-blue-400 focus:outline-none mb-4 transition-all duration-300 ease-in-out"
        >
          Create Account
        </button>

        {/* Link to Login */}
        <div className="flex justify-center gap-2 pt-2">
          Already have an account?{" "}
          <Link
            href="/loginpage"
            className="text-white font-bold transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
