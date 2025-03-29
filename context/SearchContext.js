import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (router.query.search) {
      setQuery(router.query.search);
      searchBooks(router.query.search);
    } else {
      fetchBooks();
    }
  }, [router.query.search]);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Something went wrong.");
    }
  };

  const searchBooks = async (searchQuery) => {
    if (!searchQuery) {
      setError("Please enter a search term.");
      setBooks([]);
      return;
    }

    setError("");

    try {
      const res = await fetch(`/api/books?search=${searchQuery}`);
      const data = await res.json();

      if (data.length === 0) {
        setError("No books found.");
        setBooks([]);
      } else {
        setBooks(data);
        router.push(`/?search=${searchQuery}`, undefined, { shallow: true });
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Something went wrong.");
      setBooks([]);
    }
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, books, error, searchBooks }}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
