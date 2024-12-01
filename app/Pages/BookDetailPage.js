// "use client";
// import React, { useState } from "react";

// const BookSearch = () => {
//   const [query, setQuery] = useState(""); // Search query
//   const [books, setBooks] = useState([]); // Books data
//   const [loading, setLoading] = useState(false); // Loading state
//   const [error, setError] = useState(null); // Error state

//   const fetchBooks = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.NEXT_PUBLIC_API_KEY}`
//       );
//       const data = await response.json();

//       if (data.items) {
//         setBooks(data.items);
//       } else {
//         setBooks([]);
//       }
//     } catch (err) {
//       setError("Failed to fetch books. Please try again later.");
//     }

//     setLoading(false);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (query.trim() !== "") {
//       fetchBooks();
//     }
//   };

//   return (
//     <div className="p-4 bg-gray-100 min-h-screen">
//       <h1 className="text-2xl font-bold mb-4 text-center">Book Search</h1>

//       {/* Search Bar */}
//       <form onSubmit={handleSearch} className="flex justify-center mb-8">
//         <input
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search for books..."
//           className="p-2 border border-gray-400 rounded-l-md w-1/2"
//         />
//         <button
//           type="submit"
//           className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
//         >
//           Search
//         </button>
//       </form>

//       {/* Loading State */}
//       {loading && <p className="text-center text-blue-500">Loading...</p>}

//       {/* Error State */}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {/* Books List */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {books.map((book) => (
//           <div
//             key={book.id}
//             className="p-4 bg-white border border-gray-300 rounded-lg shadow"
//           >
//             <h2 className="text-lg font-bold mb-2">
//               {book.volumeInfo.title || "No Title"}
//             </h2>
//             <p className="text-sm text-gray-700">
//               {book.volumeInfo.authors
//                 ? book.volumeInfo.authors.join(", ")
//                 : "Unknown Author"}
//             </p>
//             {book.volumeInfo.imageLinks && (
//               <img
//                 src={book.volumeInfo.imageLinks.thumbnail}
//                 alt={book.volumeInfo.title}
//                 className="w-full h-48 object-cover mt-2"
//               />
//             )}
//             {book.saleInfo.buyLink && (
//               <a
//                 href={book.saleInfo.buyLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block mt-4 text-blue-500 hover:underline"
//               >
//                 Buy this book
//               </a>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* No Results */}
//       {!loading && books.length === 0 && query.trim() !== "" && (
//         <p className="text-center text-gray-500">No books found.</p>
//       )}
//     </div>
//   );
// };

// export default BookSearch;
import React from "react";

const BookDetailPage = () => {
  return <div>BookDetailPage</div>;
};

export default BookDetailPage;
