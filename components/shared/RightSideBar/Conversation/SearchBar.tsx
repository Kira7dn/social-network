import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [hover, setHover] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full"
    >
      <div
        className={`w-full h-8 transition-all duration-700 ease-in-out transform flex justify-between items-center border rounded-full pl-2 pr-2`}
      >
        <button className="px-1 rounded-full hover:text-primary text-secondary">
          <Search size={18} />
        </button>
        <input
          className={`outline-none w-full bg-transparent text-sm text-secondary`}
          type="text"
          onChange={(event) => setInput(event.target.value)}
          value={input}
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
          placeholder="Search on Conversation"
        />
      </div>
    </div>
  );
};

export default SearchBar;
