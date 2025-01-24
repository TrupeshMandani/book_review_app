// This is the code to fetch the API from google API which is used to show the books in the main page and whole website 
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
const fetchAuthors = async (authorName, apiKey) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorName}&key=${apiKey}`
    );
    const data = await response.json();

    if (data.items) {
      // Extract relevant data from the response
      const authors = data.items.map((item) => {
        const volumeInfo = item.volumeInfo;
        return {
          id: item.id,
          name: volumeInfo.authors ? volumeInfo.authors[0] : "Unknown Author",
          biography: volumeInfo.description || "No biography available",
          imageUrl: volumeInfo.imageLinks
            ? volumeInfo.imageLinks.thumbnail
            : null,
          books: volumeInfo.title ? [volumeInfo.title] : [], // Add more books if available
        };
      });
      return authors; // Return the structured authors data
    } else {
      return []; // Return an empty array if no authors found
    }
  } catch (err) {
    throw new Error("Error fetching authors: " + err.message);
  }
};

export { fetchBooks, fetchAuthors };
