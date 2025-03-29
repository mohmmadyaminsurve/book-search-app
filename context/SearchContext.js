import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (router.query.search) {
      setQuery(router.query.search);
      searchBooks(router.query.search, false);
    } else if (router.pathname === "/") {
      fetchBooks();
    }
  }, [router.isReady, router.query.search]);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const searchBooks = async (searchQuery, updateUrl = true) => {
    if (!searchQuery) {
      setError("Please enter a search term.");
      setBooks([]);
      return false;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/books?search=${searchQuery}`);
      const data = await res.json();

      if (data.length === 0) {
        setError("No books found.");
        setBooks([]);
      } else {
        setBooks(data);
        setError("");
        if (updateUrl) {
          router.push(`/?search=${searchQuery}`, undefined, { shallow: true });
        }
      }
      return data.length > 0;
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Something went wrong.");
      setBooks([]);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setError("");
    fetchBooks();
  };

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
        books,
        error,
        isLoading,
        searchBooks,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
