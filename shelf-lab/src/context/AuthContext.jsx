import { createContext, useContext, useState } from "react";

const API = "https://dummyjson.com";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  async function login(username, password) {
    const response = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.message || "Login failed");
    setToken(result.accessToken);
  }

  function logout() {
    setToken(null);
  }

  const value = { token, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
