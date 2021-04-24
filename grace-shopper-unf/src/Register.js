import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import { createInitialEmptyCart, registerUser, fetchUserData } from "./api";

export default function Register({
  username,
  setUsername,
  password,
  setPassword,
  userId,
  setUserId,
  cart,
  setCart,
  setUser,
  setPurchaseHistory
}) {

  
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  const registerNewUser = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      swal("Oops", "Passwords must match.", "error");
    }
    const registeredUserData = await registerUser(username, password);
    console.log(registeredUserData);
    if (registeredUserData.error) {
      if (registeredUserData.error.name === "PasswordTooShortError") {
        swal(
          "Oops",
          "Password must be at least 8 characters. Please try again.",
          "error"
        );
      } else if (registeredUserData.error.name === "UserExistsError") {
        swal("Oops", "A user by that username already exists.", "error");
        setUsername("");
        setPassword("");
        setConfirmPassword("");
      }
    } else if (registeredUserData.token) {
      swal({
        title: "Welcome!",
        text: "You've registered successfully!",
        icon: "success",
        button: false,
        timer: 2000,
      });
      setPassword("");
      const token = registeredUserData.token;
      setUserId(registeredUserData.user.id);
      await createInitialEmptyCart(registeredUserData.user.id);
      setCart([]);
      setPurchaseHistory([]);
      console.log(cart);
      localStorage.setItem("token", token);
      history.push("/account");
    }
  };

  return (
    <form id="loginform" onSubmit={registerNewUser}>
      <h2 id="headerTitle">Register</h2>
      <div className="loginRow">
        <label>Username</label>
        <input
          required
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="loginRow">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="loginRow">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div id="button" className="loginRow">
        <button type="submit">Register</button>
      </div>
      <Link to="/login">Already have an account? Sign in here </Link>
    </form>
  );
}
