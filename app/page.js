import Image from "next/image";
import SearchBar from "./Components/SearchBar";
import NavBar from "./Components/NavBar";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="flex justify-between items-start w-full p-4">
        <div className=" w-full">
          <NavBar />
        </div>
        <div className=" px-5 py-1">
          <SearchBar />
        </div>
      </div>
    </div>
  );
}
// correct code
