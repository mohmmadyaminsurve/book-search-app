import Link from "next/link";
import Header from "../components/Header";
import { useSearch } from "../context/SearchContext";

export default function Home() {
  const { books, error } = useSearch();

  return (
    <div className="container">
      <Header />
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
