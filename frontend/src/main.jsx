import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AuthProvider } from './context/AuthContext';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SearchProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SearchProvider>
    </BrowserRouter>
  </React.StrictMode>
);
// This is the main entry point of the React application.
// It renders the App component wrapped in BrowserRouter for routing,
// SearchProvider for search context, and AuthProvider for authentication context.