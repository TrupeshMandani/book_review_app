import Image from "next/image";
import React, { useState, useEffect } from "react";
import { db } from "../utils/firebase"; // Firestore instance
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

const BookCard = ({ book }) => {
  const { title, authors, description, imageLinks, saleInfo } = book.volumeInfo;
  const { buyLink } = saleInfo || {};

  const [showReviewBox, setShowReviewBox] = useState(false); // Toggle review box
  const [reviewText, setReviewText] = useState(""); // Review text input
  const [reviews, setReviews] = useState([]); // Store reviews for this book
  const [showFullDescription, setShowFullDescription] = useState(false); // Toggle full description
  const router = useRouter(); // To navigate to BookDetailPage
  const bookId = book.id; // Unique book ID

  // Fetch reviews from Firestore
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsCollection = collection(db, "books", bookId, "reviews");
        const snapshot = await getDocs(reviewsCollection);
        const fetchedReviews = snapshot.docs.map((doc) => doc.data());
        setReviews(fetchedReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err.message);
      }
    };

    fetchReviews();
  }, [bookId]);

  // Handle review submission
  const submitReview = async () => {
    if (!reviewText.trim()) {
      alert("Review cannot be empty!");
      return;
    }

    try {
      const reviewsCollection = collection(db, "books", bookId, "reviews");
      await addDoc(reviewsCollection, {
        text: reviewText,
        timestamp: new Date(),
      });
      setReviews((prevReviews) => [...prevReviews, { text: reviewText }]);
      setReviewText(""); // Clear the input
      setShowReviewBox(false); // Close the review box
    } catch (err) {
      console.error("Error submitting review:", err.message);
    }
  };

  // Navigate to the BookDetailPage
  const handleBookClick = () => {
    router.push(`/book/${bookId}`);
  };

  // Handle showing full description
  const handleShowFullDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div
      onClick={handleBookClick} // Handle card click
      className="bg-black border-4 border-white align-middle transform transition-transform duration-300 hover:scale-105 focus:scale-105 active:scale-105 hover:shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2] p-4 flex flex-col justify-between h-full cursor-pointer"
    >
      <div className="flex flex-col items-center mb-4">
        {/* Book Image */}
        {imageLinks?.thumbnail && (
          <Image
            src={imageLinks.thumbnail}
            alt={title || "Book cover image"}
            className="w-48 h-72 object-cover mb-4 rounded-md"
            width={128}
            height={192}
          />
        )}
        {/* Book Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-2">
          {title || "No Title"}
        </h2>
        {/* Book Authors */}
        {authors && (
          <p className="text-sm text-gray-400 text-center mb-2">
            {authors.join(", ")}
          </p>
        )}
        {/* Book Description */}
        <p className="text-sm text-gray-300 mb-4 text-center">
          {description
            ? showFullDescription
              ? description // Show full description if toggled
              : description.substring(0, 200) + "..." // Show truncated description (up to 200 chars)
            : "No description available."}
        </p>
        {/* Toggle "Read more" or "Show less" */}
        {description && description.length > 200 && (
          <button
            onClick={handleShowFullDescription}
            className="text-blue-500 hover:underline"
          >
            {showFullDescription ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Buttons Container */}
      <div className="flex flex-col gap-3 mt-auto">
        {/* Purchase Button */}
        <div className="flex gap-4 mt-auto">
          <button
            onClick={() => {
              if (title) {
                const amazonSearchURL = `https://www.amazon.com/s?k=${encodeURIComponent(
                  title
                )}`;
                window.open(amazonSearchURL, "_blank");
              } else {
                alert("No title available to search on Amazon.");
              }
            }}
            className="bg-black text-white border-2 border-white py-2 px-4 hover:bg-white hover:text-black transition-all m-3 duration-300 hover:shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]"
          >
            Purchase
          </button>

          <button
            onClick={() => {
              if (title) {
                const searchQuery = `${title} filetype:pdf`;
                const luckySearchURL = `https://www.google.com/search?btnI=I&q=${encodeURIComponent(
                  searchQuery
                )}`;
                window.open(luckySearchURL, "_blank");
              } else {
                alert("No title available to search for PDFs.");
              }
            }}
            className="bg-black text-white border-2 border-white py-2 px-4 hover:bg-white hover:text-black transition-all m-3 duration-300 hover:shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]"
          >
            Read / Download E-Book
          </button>
        </div>

        {/* Review Button */}
        <button
          onClick={() => setShowReviewBox(!showReviewBox)}
          className="bg-black text-white border-2 border-white py-2 px-4 hover:bg-white hover:text-black transition-all m-3 duration-300 hover:shadow-[5px_5px_0px_#000,10px_10px_0px_#4a90e2]"
        >
          {showReviewBox ? "Cancel" : "Write a Review"}
        </button>

        {/* Review Input Box */}
        {showReviewBox && (
          <div className="mt-3">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full p-3 border-2 border-white bg-black text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300 ease-in-out"
              rows={4}
            ></textarea>
            <button
              onClick={submitReview}
              className="mt-2 w-full bg-blue-500 text-white py-2 px-4 hover:bg-blue-700 transition-all duration-300"
            >
              Submit Review
            </button>
          </div>
        )}

        {/* Reviews List */}
        <div className="mt-4">
          <h3 className="text-white font-bold mb-2">Reviews:</h3>
          {reviews.length > 0 ? (
            <>
              {reviews.slice(0, 2).map((review, index) => (
                <p
                  key={index}
                  className="text-sm text-gray-300 border-t border-gray-700 pt-2"
                >
                  {review.text}
                </p>
              ))}
              {reviews.length > 2 && (
                <button
                  onClick={() => router.push(`/book/${bookId}`)}
                  className="mt-2 text-blue-400 hover:underline"
                >
                  Read more reviews
                </button>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-500">
              No reviews yet. Be the first!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
