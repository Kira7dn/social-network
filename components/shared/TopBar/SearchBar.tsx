import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
    const [hover, setHover] = useState(false);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState("");
    const isExpand = hover || input || typing;

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="w-full h-full"
        >
            <div
                className={`${isExpand ? "w-80" : "w-28"
                    } h-8 transition-all duration-700 ease-in-out transform flex justify-between items-center border rounded-full pl-4 pr-2`}
            >
                <input
                    className={`outline-none w-full bg-transparent text-sm text-secondary`}
                    type="text"
                    onChange={(event) => setInput(event.target.value)}
                    value={input}
                    onFocus={() => setTyping(true)}
                    onBlur={() => setTyping(false)}
                />
                <button className="px-1 rounded-full hover:text-primary text-secondary">
                    <Search size={18} />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;
