import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const API = "https://dummyjson.com";

export default function WhoAmI() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    setError(null);
    try {
      const response = await fetch(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await response.json();
      console.log(result);
      if (!response.ok) throw new Error(result.message || "Request Failed");
      setUser(result);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section>
      <button onClick={handleClick}>Who Am I?</button>
      {user && (
        <p>
          {user.firstName} {user.lastName} ({user.email})
        </p>
      )}
      {error && <p>{error}</p>}
    </section>
  );
}
