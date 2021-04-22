const express = require('express');
const { getAllProducts, createProducts, updateProducts, deleteProduct, addNewReviewToProduct, getProductById } = require('../db');
const { requireUser } = require('./utils');
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);

  } catch (error) {
    throw error;
  }
});


productsRouter.post("/", async (req, res, next) => {
  const { name, description, creatorId, price, reviews = [] } = req.body;
  const productsData = {};

  try {
    productsData.name = name;
    productsData.description = description;
    productsData.creatorId = creatorId;
    productsData.price = price;
    productsData.reviews = reviews;

    const products = await createProducts(productsData);
    res.send({
      message: "New Product Created",
      data: products,
    });
  } catch (error) {
    throw error;
  }
});

productsRouter.post("/review", async (req, res, next) => {
  const { title, stars, description, productId } = req.body;
  const reviewsData = {};

  try {
    reviewsData.title = title;
    reviewsData.stars = stars;
    reviewsData.description = description;
    reviewsData.productId = productId;

    const review = await addNewReviewToProduct(productId, reviewsData);
    res.send({
      message: "New Product Created",
      data: review,
    });
  } catch (error) {
    throw error;
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId: id } = req.params;

  try {
    const updatedProduct = await getProductById(id
    );
    res.send(
      updatedProduct
    );
  } catch (error) {
    throw error;
  }
});


productsRouter.patch("/:productId", async (req, res, next) => {
  const { name, description, price } = req.body;
  const { id } = req.params;
  const productData = {};

  if (name) {
    productData.name = name;
  }
  if (description) {
    productData.description = description;
  }
  if (price) {
    productData.price = price;
  }

  try {
    const updatedProducts = await updateProducts({
      id: id,
      name: productData.name,
      description: productData.description,
      price: productData.price
    });
    res.send({
      message: "Product updated successfully",
      data: updatedProducts,
    });
  } catch (error) {
    throw error;
  }
});

productsRouter.delete('/:productId', requireUser, async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await getProductById(productId);

    if (product.creatorId === req.user.id) {
      const deletedProduct = await deleteProduct(product.id);
      res.send(deletedProduct);
    } else {
      next();
    }
  } catch (error) {
    throw error
  }
})


module.exports = productsRouter;

