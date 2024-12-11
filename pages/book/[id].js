import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../app/utils/firebase"; // Firestore instance
import { collection, getDocs } from "firebase/firestore"; // Firestore imports
import { fetchBooks } from "../../app/utils/FetchAPI"; // Import fetchBooks from utils
import Image from "next/image"; // Import Image for optimized images

const BookDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the book ID from URL query
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false); // Added state for description toggle
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Add your API key here

  // Fetch the book details from the API (Google Books)
  useEffect(() => {
    if (id) {
      const fetchBookDetails = async () => {
        try {
          // Fetch book details using the API
          const bookData = await fetchBooks(id, apiKey);
          if (bookData.length > 0) {
            setBook(bookData[0]); // Assuming bookData contains a list of books, take the first one
          } else {
            console.error("Book not found!");
          }
        } catch (error) {
          console.error("Error fetching book details:", error.message);
        }
      };

      fetchBookDetails();
    }
  }, [id]);

  // Fetch reviews for the book from Firestore
  useEffect(() => {
    if (id) {
      const fetchReviews = async () => {
        try {
          const reviewsCollection = collection(db, "books", id, "reviews");
          const snapshot = await getDocs(reviewsCollection);
          const fetchedReviews = snapshot.docs.map((doc) => doc.data());
          setReviews(fetchedReviews); // Set the reviews data from Firestore
        } catch (error) {
          console.error("Error fetching reviews:", error.message);
        }
      };

      fetchReviews();
    }
  }, [id]);

  // Loading state handling
  useEffect(() => {
    if (book && reviews !== undefined) {
      setLoading(false); // Stop loading when book and reviews are fetched
    }
  }, [book, reviews]);

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      {loading ? (
        <p className="text-white text-center">Loading book details...</p>
      ) : (
        <>
          {book ? (
            <div className="flex flex-col items-center bg-black p-6 border-4 border-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
              {/* Book Image */}
              {book.volumeInfo?.imageLinks?.thumbnail && (
                <Image
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={book.volumeInfo?.title || "Book Cover"}
                  className="w-48 h-72 object-cover mb-4 rounded-md"
                  width={192}
                  height={288}
                />
              )}
              {/* Book Title */}
              <h1 className="text-3xl font-bold text-white text-center mb-4">
                {book.volumeInfo?.title || "No Title"}
              </h1>
              {/* Book Author */}
              <p className="text-sm text-gray-400 text-center mb-4">
                {book.volumeInfo?.authors?.join(", ") || "Unknown Author"}
              </p>
              {/* Book Description */}
              <p className="text-sm text-gray-300 text-center mb-4">
                {showFullDescription
                  ? book.volumeInfo?.description || "No description available."
                  : book.volumeInfo?.description?.slice(0, 200) + "..."}
              </p>
              {/* Show More / Show Less Description */}
              {book.volumeInfo?.description &&
                book.volumeInfo.description.length > 200 && (
                  <button
                    className="text-blue-500 hover:underline mt-2"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? "Show less" : "Read more"}
                  </button>
                )}

              {/* Reviews Section */}
              <h3 className="text-2xl font-semibold text-white mt-6 mb-4">
                Reviews
              </h3>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-4 mb-4 rounded-md border border-gray-600 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-gray-300">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">
                  No reviews yet. Be the first to review!
                </p>
              )}
            </div>
          ) : (
            <p className="text-white text-center">Book not found!</p>
          )}
        </>
      )}
    </div>
  );
};

export default BookDetailPage;
