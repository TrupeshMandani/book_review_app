// utils/FetchAPI.js
const fetchBooks = async (query, apiKey) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.items) {
      return data.items; // Return books data if available
    } else {
      return []; // Return empty if no books found
    }
  } catch (err) {
    throw new Error("Error fetching books: " + err.message);
  }
};

// utils/FetchAPI.js
const fetchAuthors = async () => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorName}&key=${apiKey}"
    );
    const data = await response.json();

    if (data.authors) {
      return data.authors; // Return authors data if available
    } else {
      return []; // Return empty array if no authors found
    }
  } catch (err) {
    throw new Error("Error fetching authors: " + err.message);
  }
};

export { fetchBooks, fetchAuthors };
