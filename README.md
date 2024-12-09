This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

1. Google Books API
   The API link

"use client";
import React, { useState } from "react";
import {
auth,
GoogleAuthProvider,
GithubAuthProvider,
signInWithEmailAndPassword,
signInWithPopup,
RecaptchaVerifier,
PhoneAuthProvider,
} from "../utils/firebase"; // Updated import
import Link from "next/link"; // Import Link for navigation
import { FaSignInAlt } from "react-icons/fa"; // Import login icon

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [error, setError] = useState("");

// Email/Password Login
const handleEmailLogin = async () => {
try {
await signInWithEmailAndPassword(auth, email, password);
window.location.href = "/dashboard"; // Redirect to dashboard
} catch (error) {
setError(error.message);
}
};

// Google Login
const handleGoogleLogin = async () => {
const provider = new GoogleAuthProvider();
try {
await signInWithPopup(auth, provider);
window.location.href = "/dashboard"; // Redirect to dashboard
} catch (error) {
setError(error.message);
}
};

// GitHub Login
const handleGithubLogin = async () => {
const provider = new GithubAuthProvider();
try {
await signInWithPopup(auth, provider);
window.location.href = "/dashboard"; // Redirect to dashboard
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
window.location.href = "/dashboard"; // Redirect to dashboard
} catch (error) {
setError(error.message);
}
};

return (
<div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
{/_ NavBar _/}
<nav className="bg-black w-full text-white border-4 border-white shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] font-mono p-4 sticky top-0 z-50">
<div className="flex justify-between items-center">
<div className="text-2xl font-bold">Bookstore</div>
<div className="flex gap-4">
<Link
              href="/loginpage"
              className="flex items-center gap-2 text-white font-bold text-lg transition-all duration-300 ease-in-out hover:text-blue-400 hover:underline"
            >
<FaSignInAlt className="text-xl" /> Login
</Link>
</div>
</div>
</nav>

      {/* Login Form */}
      <div className="bg-black p-8 rounded-lg shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] w-full max-w-md mt-12 border-4 border-white">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {/* Email/Password Login */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleEmailLogin}
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Login with Email
        </button>

        {/* Google and GitHub Login */}
        <div className="mt-4 flex gap-4 justify-center">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Login with Google
          </button>
          <button
            onClick={handleGithubLogin}
            className="bg-gray-800 text-white p-3 rounded-lg hover:bg-gray-900 transition duration-300"
          >
            Login with GitHub
          </button>
        </div>

        {/* Phone Number Login */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-white rounded-lg bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div id="recaptcha-container" className="mt-4"></div>
          <button
            onClick={handlePhoneLogin}
            className="w-full bg-green-500 text-white p-3 rounded-lg mt-4 hover:bg-green-600 transition duration-300"
          >
            Login with Phone
          </button>
        </div>
      </div>
    </div>

);
};

export default Login;
