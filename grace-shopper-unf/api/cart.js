const express = require('express');
const { getProductById } = require('../db/products')
const { getCartByuserId, createCart, addNewProductToCart, deleteProductFromCart, changeQuantity } = require('../db/cart');
const { addToRecentPurchases, getPurchaseHistoryByUserId, getAllPurchaseHistory } = require('../db/purchaseHistory');
const cartRouter = express.Router();


cartRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params
  try {
    const cart = await getCartByuserId(userId);
    res.send(cart);
  } catch (error) {
    res.send({
      message: 'No items in cart'
    })
    throw error;
  }
});


cartRouter.post("/", async (req, res, next) => {
  const { userId, productIds } = req.body;
  try {
    const cart = await createCart({ userId: userId, productIds });
    res.send({
      message: "Cart created"
    })
  } catch (error) {
    throw error;
  }


})



cartRouter.post("/addProduct", async (req, res, next) => {
  const { userId, productId, size, quantity } = req.body;
  try {
    const cart = await addNewProductToCart(userId, productId, size, quantity);
    res.send({
      message: "Item added to cart"
    })
  } catch (error) {
    throw error;
  }


})

cartRouter.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { userId } = req.body;

  try {
    const product = await getProductById(productId);
    const deletedProduct = await deleteProductFromCart(userId, product.id);
    res.send(deletedProduct);

  } catch (error) {
    throw error
  }
})

cartRouter.post("/submit", async (req, res, next) => {
  const { userId, email } = req.body;
  try {
    const purchaseHistory = await addToRecentPurchases(userId, email);
    res.send({
      data: purchaseHistory,
      message: "Thank you for your purchase"
    })
  } catch (error) {
    throw error;
  }
})

cartRouter.get("/purchaseHistory/:userId", async (req, res, next) => {
  const { userId } = req.params
  try {
    const purchaseHistory = await getPurchaseHistoryByUserId(userId);
    res.send(purchaseHistory);

  } catch (error) {
    res.send()
    throw error;
  }
});

cartRouter.patch("/quantity", async (req, res, next) => {
  const { quantity, productsId, userId } = req.body;
  try {
    const updatedQuantity = await changeQuantity(quantity, productsId, userId);
    res.send({
      message: "quantity updated",
      data: updatedQuantity
    })
  } catch (error) {
    throw error;
  }
});

cartRouter.get("/", async (req, res, next) => {
  try {
    const purchaseHistory = await getAllPurchaseHistory();
    res.send(purchaseHistory);

  } catch (error) {
    res.send()
    throw error;
  }
});

module.exports = cartRouter;
