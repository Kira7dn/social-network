import Image from "next/image";
import React from "react";

type Props = {};

function SearchBar({}: Props) {
  return (
    <div className="flex-1 max-w-lg h-full">
      <form
        action=""
        className="px-4 rounded-3xl flex justify-between bg-[#ECE6EB]"
      >
        <input
          type="text"
          placeholder="Search"
          className="h-10 bg-transparent flex-1 w-full p-1 rounded-lg shadow-xs text-base text-dark-1 placeholder-dark-2 focus:outline-none"
        />
        <button type="submit">
          <Image
            src="/assets/search-message.svg"
            alt="search"
            width={20}
            height={20}
          />
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
