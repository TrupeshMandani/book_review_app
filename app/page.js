import Image from "next/image";
import SearchBar from "./Components/SearchBar";

export default function Home() {
  return (
    <div className=" text-5xl flex h-screen items-center justify-center">
      {" "}
      Welcome to Book Review App -- By Trupesh Mandani <SearchBar />
    </div>
  );
}
