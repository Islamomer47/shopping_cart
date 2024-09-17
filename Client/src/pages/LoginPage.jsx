import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../features/authSlice";
import { getTokenFromLocalStorage } from "../utils/cookieUtils";
import { jwtDecode } from "jwt-decode";

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
        // Retrieve the token from localStorage
        const token = getTokenFromLocalStorage();

        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const { role } = decodedToken;
            console.log("Decoded Role:", role);

            if (role === "admin") {
              navigate("/admin-dashboard");
            } else if (role === "user") {
              navigate("/");
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        } else {
          console.error("No token found");
        }
      } else {
        console.error("Login failed:", action.error);
      }
    } catch (error) {
      console.error("Login error:", error);
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
