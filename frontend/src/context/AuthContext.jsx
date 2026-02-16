import { createContext, useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const AuthContext = createContext();
const backend_url = import.meta.env.VITE_BACKEND_URL;
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${backend_url}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      toast.success("Logged in successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(`${backend_url}/auth/signup`, {
        name,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      toast.success("Account created");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
