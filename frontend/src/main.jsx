import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <ExpenseProvider>
        <App />
        <ToastContainer position="top-right" />
      </ExpenseProvider>
    </AuthProvider>
  </BrowserRouter>,
);
