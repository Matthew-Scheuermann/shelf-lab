import { useBooks } from "./hooks/useBooks";

export default function App() {
  const { books, loading, error } = useBooks();

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
