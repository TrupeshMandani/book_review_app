// this is the login page code 

"use client";
import React, { useState } from "react";
import {
  auth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "../utils/firebase"; // Updated import
import Link from "next/link"; // Import Link for navigation
import { FaGoogle, FaGithub } from "react-icons/fa"; // Import Google and GitHub logos

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Email/Password Login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/"; // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/"; // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  // GitHub Login
  const handleGithubLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/"; // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  // Phone Number Login
  const handlePhoneLogin = async () => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const confirmationResult = await phoneProvider.verifyPhoneNumber(
        phone,
        recaptchaVerifier
      );
      const code = prompt("Enter the OTP sent to your phone");
      await confirmationResult.confirm(code);
      window.location.href = "/"; // Redirect to dashboard
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center justify-center p-8 text-white font-mono">
      {/* Login Form */}
      <div className="w-full max-w-md bg-black p-8 border-4 border-white shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Login
        </h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Email/Password Login */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border-2 border-white bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none "
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-white bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none  "
          />
        </div>
        <button
          onClick={handleEmailLogin}
          className="w-full p-3 border-2 border-white hover:bg-white hover:text-black bg-black text-white placeholder-gray-500 shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] focus:ring-2 focus:ring-blue-400 focus:outline-none   mb-4 transition-all duration-300 ease-in-out"
        >
          Login with Email
        </button>
        <p className="flex py-5 justify-center text-white">Or Login With</p>
        {/* Google and GitHub Login */}
        <div className="flex justify-between gap-4 mb-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] p-3 border-2 border-white hover:bg-white hover:text-black bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none   transition-all duration-300 ease-in-out"
          >
            <FaGoogle className="text-xl inline-block mr-2" /> Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="w-full p-3 shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] border-2 border-white hover:bg-white hover:text-black bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none   transition-all duration-300 ease-in-out"
          >
            <FaGithub className="text-xl inline-block mr-2" /> GitHub
          </button>
          {/* Add sign up option */}
        </div>
        <div className="flex justify-center gap-2 pt-2">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-white font-bold  transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
