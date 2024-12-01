/**
 * The Home component renders a black background with white text, containing a NavBar and a SearchBar
 * component.
 * @returns The `Home` component is being returned, which contains a black background with white text,
 * a navigation bar (`NavBar` component), and a search bar (`SearchBar` component) displayed side by
 * side.
 */
import NavBar from "./Components/NavBar";
import SearchBar from "./Components/SearchBar";
import Footer from "./Components/Footer";
import BookSearch from "./Pages/BookDetailPage";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start w-full p-4">
          <div className="w-full">
            <NavBar />
          </div>
          <div className="px-5 py-1">
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow">
        {" "}
        <BookSearch />
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

// correct code
