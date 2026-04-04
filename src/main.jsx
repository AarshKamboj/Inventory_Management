/**
 * Entry point of React App
 * Wraps app with Router & AuthProvider
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StoreProvider } from "./context/StoreContext";
import "./styles/global.css";
import "./styles/theme.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StoreProvider>
  </BrowserRouter>
);
