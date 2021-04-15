const express = require("express");
const usersRouter = express.Router();

const { getUserByUsername, createUser, getAllUsers, getProductsByUsername } = require("../db/");

const jwt = require("jsonwebtoken");
const { requireUser } = require("./utils");
const { JWT_SECRET = "neverTell" } = process.env;

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    throw error;
  }
});

usersRouter.get("/:username/products", async (req, res, next) => {
  const username = req.params;

  try {
    const products = await getProductsByUsername(username.username);
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const usernameCheck = await getUserByUsername(username);

    if (usernameCheck) {
      throw error;
    }

    if (password.length < 8) {
      throw error;
    }

    const user = await createUser({ username, password });

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      user,
      token,
      message: "Thank you for registering",
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next({
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    const verifyPassword = jwt.verify(token, JWT_SECRET);

    if (user && verifyPassword) {
      res.send({
        user,
        token,
        message: "Logged In",
      });
    } else {
      next({ message: "username or password is incorrect" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
