/**
 * Stores logged-in user globally
 * So all pages can access authentication state
 */

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  // Load user from localStorage on refresh
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // Save user after login
  const login = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
  };

  // Clear user on logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};