import { useBooks } from "./hooks/useBooks";
import { useAuth } from "./context/AuthContext";
import LoginForm from "./components/LoginForm";
import WhoAmI from "./components/WhoAmI";

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
      <WhoAmI />
      <ul>
        {books.map((book) => (
          <li key={book.key}>
            <span>{book.title}</span>
            <span>{book.author_name?.join(", ")}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
