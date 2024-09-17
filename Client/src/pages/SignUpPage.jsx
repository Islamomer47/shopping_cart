// /src/pages/SignUpPage.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignUp } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(userSignUp(userData)).then(() => {
      navigate("/login"); // Redirect to login page after successful sign-up
    });
  };

  return (
    <div className="mt-16">
      <h1 className="text-center text-4xl mb-5"> Signup </h1>
      <form
        onSubmit={handleSignUp}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          value={userData.username}
          onChange={(e) =>
            setUserData({ ...userData, username: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
