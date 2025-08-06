import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setAuthUser(res.data);
        
      } catch (error) {
        setAuthUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setAuthUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading) return <h1 className="text-white text-center mt-20">Loading...</h1>;

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
