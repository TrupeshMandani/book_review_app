import Image from "next/image";
import SearchBar from "./Components/SearchBar";
import NavBar from "./Components/NavBar";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex justify-between items-center w-full p-4">
        <NavBar />
        <SearchBar />
      </div>
    </div>
  );
}
