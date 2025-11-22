import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { getUserByEmail } from "../../services/userService";
import { createUserIfNotExists } from "../../services/userService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function updateDbUser() {
    if (auth?.currentUser?.email) {
      let u = await getUserByEmail(auth?.currentUser?.email);
      setDbUser(u);
      if (u == null) setUser(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      await createUserIfNotExists(currentUser);
      await updateDbUser();
      setUser(currentUser);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, dbUser, updateDbUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
