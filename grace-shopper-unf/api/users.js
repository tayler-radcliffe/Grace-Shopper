const express = require("express");
const usersRouter = express.Router();

const { getUserByUsername, createUser, getAllUsers, getProductsByUsername, insertFnLnEmail, getUserById, deleteUser } = require("../db/");

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
      next({
        name: 'UserExistsError',
        message: 'A user by that username already exists'
      });
    }

    if (password.length < 8) {
      next({
        name: 'PasswordTooShortError',
        message: 'Password must be at least 8 characters.'
      });
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
    next({ name: 'RegisterError', 
    message: 'There was an error creating your account.' })
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

    console.log('look here HELLO', user)
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

usersRouter.patch("/", async (req, res, next) => {
  const {userId, firstName, lastName, email} = req.body;
  
  try {
    const userInfo = await insertFnLnEmail(userId, firstName, lastName, email);
    res.send({
      message: "Information added to account"
    })
  } catch (error) {
    throw error;
  }
})


usersRouter.get("/:username/personal", async (req, res, next) => {
  const username = req.params;

  try {
    const user = await getUserByUsername(username.username);
    res.send(
      user
      );
  } catch ({ name, message }) {
    next({ name, message });
  }
});


usersRouter.delete('/:userId', async (req, res, next) => {
  try {
      const {userId} = req.params;
      const deletedUser = await deleteUser(userId);
      res.send(deletedUser);
      }
    catch (error) {
      throw error
  }
})


module.exports = usersRouter;
