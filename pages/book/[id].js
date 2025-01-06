import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { db } from "../../app/utils/firebase"; // Firestore instance
import { collection, getDocs, addDoc } from "firebase/firestore"; // Firestore imports
import { fetchBooks } from "../../app/utils/FetchAPI"; // Import fetchBooks from utils
import Image from "next/image"; // Import Image for optimized images
import { FaStar } from "react-icons/fa";

const BookDetailPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the book ID from URL query
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false); // Added state for description toggle
  const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Add your API key here
  const [userRating, setUserRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [readingStatus, setReadingStatus] = useState("none"); // 'none', 'reading', 'completed', 'want-to-read'

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
  }, [apiKey, id]);

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

  const StarRating = ({ rating, onRatingChange }) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`cursor-pointer ${
              index < rating ? "text-yellow-400" : "text-gray-400"
            }`}
            onClick={() => onRatingChange(index + 1)}
          />
        ))}
      </div>
    );
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    try {
      const reviewRef = collection(db, "books", id, "reviews");
      await addDoc(reviewRef, {
        text: newReview,
        rating: userRating,
        userId: "user-id", // Replace with actual user ID
        createdAt: new Date().toISOString(),
      });

      setNewReview("");
      setUserRating(0);
      // Refresh reviews
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const ReadingStatusSelector = () => {
    return (
      <select
        value={readingStatus}
        onChange={(e) => setReadingStatus(e.target.value)}
        className="mt-4 p-2 rounded-md bg-gray-700 text-white"
      >
        <option value="none">Set reading status...</option>
        <option value="reading">Currently Reading</option>
        <option value="completed">Completed</option>
        <option value="want-to-read">Want to Read</option>
      </select>
    );
  };

  const ShareButtons = () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    return (
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() =>
            window.open(`https://twitter.com/intent/tweet?url=${shareUrl}`)
          }
          className="px-4 py-2 bg-blue-400 rounded-md hover:bg-blue-500"
        >
          Share on Twitter
        </button>
        <button
          onClick={() =>
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
            )
          }
          className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Share on Facebook
        </button>
      </div>
    );
  };

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
              <ReadingStatusSelector />
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

              <div className="mt-4 flex flex-col items-center">
                <p className="text-white mb-2">Rate this book:</p>
                <StarRating
                  rating={userRating}
                  onRatingChange={setUserRating}
                />
              </div>

              <form
                onSubmit={handleSubmitReview}
                className="w-full max-w-md mt-6"
              >
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-700 text-white"
                  placeholder="Write your review..."
                  rows="4"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </form>

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

              <ShareButtons />

              <div className="grid grid-cols-2 gap-4 mt-4 text-white">
                <div>
                  <p className="font-bold">Published Date:</p>
                  <p>{book.volumeInfo?.publishedDate || "Unknown"}</p>
                </div>
                <div>
                  <p className="font-bold">Page Count:</p>
                  <p>{book.volumeInfo?.pageCount || "Unknown"}</p>
                </div>
                <div>
                  <p className="font-bold">Categories:</p>
                  <p>{book.volumeInfo?.categories?.join(", ") || "Unknown"}</p>
                </div>
                <div>
                  <p className="font-bold">Publisher:</p>
                  <p>{book.volumeInfo?.publisher || "Unknown"}</p>
                </div>
              </div>
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
