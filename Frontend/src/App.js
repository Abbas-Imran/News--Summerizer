import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./components/store/auth-context";
import LoginPage from "./components/Auth/Login";
import SigninPage from "./components/Auth/Signup";
import HomePage from "./components/HomePage";
import jwtDecode from "jwt-decode";
import StripePayment from "./components/PaymentPage/stripe-Payment";
import axios from "axios";

function App() {
  const [isApproved, setIsApproved] = useState(false);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    // Check for a token in local storage
    const storedToken = localStorage.getItem("token");
    try {
      if (storedToken) {
        const decodedToken = jwtDecode(storedToken);
        AuthCtx.getUser(decodedToken);
        const apiUrl = "http://localhost:4000/approved";
        const requestData = {
          username: decodedToken.username,
        };

        axios
          .post(apiUrl, requestData)
          .then((response) => {
            // console.log("API response:", response.data);
            setIsApproved(response.data);
          })
          .catch((error) => {
            console.error("API error:", error);
          });
      }
    } catch {
      AuthCtx.logout();
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            AuthCtx.isLoggedIn ? (
              isApproved ? (
                <Navigate to="/Home" replace />
              ) : (
                <Navigate to="/Payment" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/Home"
          element={
            // AuthCtx.isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
            AuthCtx.isLoggedIn ? (
              isApproved ? (
                <HomePage />
              ) : (
                <Navigate to="/payment" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/Payment"
          element={
            // AuthCtx.isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />
            AuthCtx.isLoggedIn ? (
              isApproved ? (
                <Navigate to="/Home" replace />
              ) : (
                <StripePayment/>
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !AuthCtx.isLoggedIn ? (
              <LoginPage />
            ) : isApproved ? (
              <Navigate to="/Home" replace />
            ) : (
              <Navigate to="/Payment" replace />
            )
          }
        />
        <Route
          path="/Signup"
          element={
            !AuthCtx.isLoggedIn ? (
              <SigninPage />
            ) : isApproved ? (
              <Navigate to="/Home" replace />
            ) : (
              <Navigate to="/Payment" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
