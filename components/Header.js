import { useState } from "react";
import { useRouter } from "next/router";

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const searchBooks = () => {
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/?search=${query}`);
    }
  };

  return (
    <div className="header">
      <a href="/">
        <h1 className="title">Book Search</h1>
      </a>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for a book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" onClick={searchBooks}>
          Search
        </button>
      </div>
    </div>
  );
}
