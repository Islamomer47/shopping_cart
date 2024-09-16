import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { userLogin } from "../features/authSlice";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(userLogin(credentials)); // Await the dispatch
      if (userLogin.fulfilled.match(action)) {
        // Check if the login was successful
        const { role } = action.payload; // Extract role from the response payload
        if (role === "admin") {
          navigate("/admin-dashboard"); // Navigate to admin dashboard
        } else if (role === "user") {
          navigate("/customer-dashboard"); // Navigate to customer dashboard
        }
      } else {
        // Handle errors or unsuccessful login
        console.error("Login failed:", action.error);
      }
    } catch (error) {
      console.error("Login error:", error); // Catch any errors
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
