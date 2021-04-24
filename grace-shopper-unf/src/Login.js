import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import swal from "sweetalert";
import { fetchCartData } from "./api";
import { fetchLoggedInUser } from "./api";

export default function Login({
  username,
  setUsername,
  setUserId,
  userId,
  setCart,
  cart,
  password,
  setPassword,
}) {
  const history = useHistory();

  const loginUser = async (event) => {
    event.preventDefault();
    const userDetails = await fetchLoggedInUser(username, password);
    setUserId(userDetails.user.id);
    const userCartData = await fetchCartData(userDetails.user.id);
    setCart(userCartData);
    console.log(userCartData);
    if (userDetails.error) {
      swal(
        "Oops",
        "Username or password incorrect. Please try again.",
        "error"
      );
      setUsername("");
      setPassword("");
    } else {
      const token = userDetails.token;
      localStorage.setItem("token", token);
      swal({
        title: "Welcome back!",
        text: "You're logged in!",
        icon: "success",
        button: false,
        timer: 2000,
      });
      history.push("/account");
    }
  };

  return (
    <form id="loginform" onSubmit={loginUser}>
      <h2 id="headerTitle">Login</h2>
      <div class="loginRow">
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div class="loginRow">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div id="button" class="loginRow">
        <button type="submit">Login</button>
      </div>
      <Link to="/register">Don't have an account? Sign up here </Link>
    </form>
  );
}
