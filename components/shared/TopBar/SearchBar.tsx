import React, { useState } from 'react'
import { Search } from 'lucide-react'

const SearchBar = () => {
  const [hover, setHover] =
    useState(false)
  const [typing, setTyping] =
    useState(false)
  const [input, setInput] = useState('')
  const isExpand =
    hover || input || typing

  return (
    <div
      onMouseEnter={() =>
        setHover(true)
      }
      onMouseLeave={() =>
        setHover(false)
      }
      className="hidden h-full w-full md:block"
    >
      <div
        className={`${
          isExpand ? 'w-80' : 'w-28'
        } flex h-8 transform items-center justify-between rounded-full border pl-4 pr-2 transition-all duration-700 ease-in-out `}
      >
        <input
          className={`text-sm w-full bg-transparent text-secondary outline-none`}
          type="text"
          onChange={(event) =>
            setInput(event.target.value)
          }
          value={input}
          onFocus={() =>
            setTyping(true)
          }
          onBlur={() =>
            setTyping(false)
          }
        />
        <button className="rounded-full px-1 text-secondary hover:text-primary">
          <Search size={18} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
