import { useState } from "react";
import { useSearch } from "../context/SearchContext";

export default function Header() {
  const { query, setQuery, searchBooks } = useSearch();

  const handleSearch = (e) => {
    e.preventDefault();
    searchBooks(query);
  };

  return (
    <div className="header">
      <a href="/">
        <h1 className="title">Book Search</h1>
      </a>

      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    </div>
  );
}
