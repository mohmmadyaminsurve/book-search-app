import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const res = await fetch(`/api/books`);
      const data = await res.json();
      const foundBook = data.find((b) => b.id === parseInt(id));

      if (foundBook) {
        setBook(foundBook);
      } else {
        setError("Book not found.");
      }
    } catch (err) {
      console.error("Error fetching book:", err);
      setError("Something went wrong.");
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div className="container">
      <Header />
      <div className="book-details">
        <div className="book-content">
          <div className="book-image">
            <img src={book.image} alt={book.title} className="book-image-large" />
          </div>
          <div className="book-info">
            <h1 className="book-title">{book.title}</h1>
            <p className="book-author">By {book.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
