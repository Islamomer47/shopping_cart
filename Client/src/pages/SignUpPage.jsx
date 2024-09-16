// /src/pages/SignUpPage.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignUp } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [userData, setUserData] = useState({ name: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(userSignUp(userData)).then(() => {
      navigate("/login"); // Redirect to login page after successful sign-up
    });
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="text"
        placeholder="Name"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={userData.password}
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpPage;
