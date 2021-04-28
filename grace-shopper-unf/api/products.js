const express = require('express');
const { getAllProducts, createProducts, updateProducts, deleteProduct, addNewReviewToProduct, getProductById, getAverageReviewRatingByProductId, getProductIdByProductName } = require('../db');
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

productsRouter.get("/ratings/:productId", async (req, res, next) => {
  const { productId: id } = req.params;

  try {
    const reviewsByProductId = await getAverageReviewRatingByProductId(id);
    res.send({ averageRating: reviewsByProductId });
  } catch (error) {
    throw error;
  }

});


productsRouter.post("/", async (req, res, next) => {
  const { name, description, creatorId, price, reviews = [], productImage, productStock } = req.body;
  const productsData = {};

  try {
    productsData.name = name;
    productsData.description = description;
    productsData.creatorId = creatorId;
    productsData.price = price;
    productsData.reviews = reviews;
    productsData.productImage = productImage;
    productsData.productStock = productStock;

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


productsRouter.patch("/:productId", async (req, res, next) => {
  const { name, description, price, productStock } = req.body;
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
  if (price) {
    productData.productStock = productStock;
  }

  try {
    const updatedProducts = await updateProducts({
      id: req.params.productId,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      productStock: productData.productStock
    });
    res.send({
      message: "Product updated successfully",
      data: updatedProducts,
    });
  } catch (error) {
    throw error;
  }
});

productsRouter.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;

    const deletedProduct = await deleteProduct(productId);
    res.send({
      message: "Product Deleted"
    });
    
  } catch (error) {
    throw error
  }
})

productsRouter.get("/id/:productName", async (req, res, next) => {
  const { productName: productName } = req.params;

  try {
    const productId = await getProductIdByProductName(productName);
    res.send(productId);
  } catch (error) {
    throw error;
  }

});


module.exports = productsRouter;

