import { useState, useEffect } from "react";

const URL = "https://openlibrary.org/search.json?q=dune&limit=10";

export function useBooks() {
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

  return { books, loading, error };
}
