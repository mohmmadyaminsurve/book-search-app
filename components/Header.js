import { useState } from "react";
import { useSearch } from "../context/SearchContext";
import { useRouter } from "next/router";

export default function Header() {
  const { query, setQuery, searchBooks, error } = useSearch();
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();
    await searchBooks(query);
    if (router.pathname !== "/") {
      router.push(`/?search=${query}`);
    }
  };

  return (
    <div className="header-container">
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

      {error && router.pathname !== "/" && <p className="error search-error">{error}</p>}
    </div>
  );
}
