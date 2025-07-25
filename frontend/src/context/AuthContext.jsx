import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional: to wait for user to load

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", {withCredentials: true, // ✅ IMPORTANT for cookies
        });
        setAuthUser(res.data.user);
      } catch (err) {
        console.error("Not logged in or error:", err.response?.data?.error || err.message);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
