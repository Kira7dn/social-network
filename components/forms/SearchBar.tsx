import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

function SearchBar() {
  return (
    <div className="flex-1 max-w-lg h-full px-4 py-1.5 rounded-3xl cursor-pointer flex justify-between bg-sky-50 hover:bg-sky-200 grow dark:hover:bg-neutral-100 dark:bg-neutral-300">
      <p className="text-dark-4">Search</p>
      <Search size={18} color="gray" />
    </div>
  );
}

export default SearchBar;
