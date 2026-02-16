import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./context/AuthContext";
function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/signup"
        element={!token ? <Signup /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
