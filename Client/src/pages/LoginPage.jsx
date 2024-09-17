import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../features/authSlice";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const action = await dispatch(userLogin(credentials));
      if (userLogin.fulfilled.match(action)) {
        // Retrieve the role from the action payload
        const { role } = action.payload;
        console.log("Role:", role);

        // Store the role in localStorage
        localStorage.setItem("role", role);

        // Navigate based on role
        if (role === "admin") {
          navigate("/admin-dashboard");
        } else if (role === "user") {
          navigate("/");
        }
      } else {
        console.error("Login failed:", action.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="mt-16">
      <h1 className="text-center text-4xl mb-5">Login</h1>
      <form
        onSubmit={handleLogin}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-600">Don't have an account?</p>
        <Link
          to="/signup"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
