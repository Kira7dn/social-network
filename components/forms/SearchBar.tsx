import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

function SearchBar() {
  return (
    <div className="flex-1 max-w-lg h-full px-4 py-1.5 rounded-3xl flex justify-between bg-neutral-200 items-center cursor-pointer active:bg-neutral-400">
      <p className="text-dark-4">Search</p>
      <Search size={18} color="gray" />
    </div>
  );
}

export default SearchBar;
