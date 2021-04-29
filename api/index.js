const express = require('express');
const apiRouter = express.Router();

const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET = 'neverTell' } = process.env;

apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.headers.authorization;

  if (!auth) { 
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      const id = parsedToken && parsedToken.id;
      

      if (id) {
        req.user = await getUserById(id);
        next();
      } else {
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const cartRouter = require('./cart');
apiRouter.use('/cart', cartRouter);

const wishListRouter = require('./wishList');
apiRouter.use('/wishList', wishListRouter);


module.exports = apiRouter;