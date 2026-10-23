import { useEffect, useState } from "react";

const URL = "https://openlibrary.org/search.json?q=dune&limit=10";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error("Request failed:" + response.status);
        const result = await response.json();
        setBooks(result.docs);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    getBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <section>
      <h1>Book Shelf</h1>
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            {book.title} by {book.author_name?.join(", ")}
          </li>
        ))}
      </ul>
    </section>
  );
}
