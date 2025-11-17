import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import LoadingSpinner from "../core/LoadingSpinner";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <LoadingSpinner className="flex justify-center items-center h-screen" />
    );
  }

  return !user ? children : <Navigate to="/" />;
}
