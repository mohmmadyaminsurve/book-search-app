import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "../components/Header";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

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
    // Update the local query state
    setQuery(searchQuery);

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
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Something went wrong.");
      setBooks([]);
    }
  };

  return (
    <div className="container">
      <Header onSearch={searchBooks} />

      {error && <p className="error">{error}</p>}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-image">
              <img src={book.image || "/api/placeholder/150/230"} alt={book.title} />
            </div>
            <div className="book-info">
              <Link href={`/book/${book.id}`} className="book-title-link">
                <h2 className="book-title">{book.title}</h2>
              </Link>
              <p className="book-author">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
