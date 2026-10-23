import { useBooks } from "./hooks/useBooks";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";

export default function App() {
  const { books, loading, error } = useBooks();
  const { token, logout } = useAuth();

  if (!token) return <LoginForm />;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <section>
      <h1>Book Shelf</h1>
      <button onClick={logout}>Log out</button>
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
