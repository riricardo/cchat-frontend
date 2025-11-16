import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-accent"></span>
      </div>
    );
  }

  return !user ? children : <Navigate to="/" />;
}
