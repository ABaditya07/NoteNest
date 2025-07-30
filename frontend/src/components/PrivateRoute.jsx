import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, token } = useContext(AuthContext);

  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  return children;
}
// This component checks if the user is authenticated.
// If not, it redirects them to the login page.