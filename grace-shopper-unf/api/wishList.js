const express = require("express");
const { addNewProductToWishList, getWishListByUserId, deleteItemFromWishList, deleteFromWishListAndAddToCart } = require("../db/wishList");
const wishListRouter = express.Router();

wishListRouter.post("/addProduct", async (req, res, next) => {
  const { userId, productId, size, productName, productPrice } = req.body;
  try {
    const wishList = await addNewProductToWishList(
      userId,
      productId,
      size,
      productName,
      productPrice
    );
    res.send({
      message: "Item added to wishList",
    });
  } catch (error) {
    throw error;
  }
});

wishListRouter.get("/:userId", async (req, res, next) => {
    const { userId } = req.params
  try {
    const wishList = await getWishListByUserId(userId);
    res.send(wishList);
  } catch (error) {
    res.send();
    throw error;
  }
});

wishListRouter.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { userId } = req.body;
  
    try {
      const deletedWishListProduct = await deleteItemFromWishList(userId, productId);
      res.send({
          message: 'Item has been deleted'
      });
  
    } catch (error) {
      throw error
    }
  })

  wishListRouter.post("/addToCart", async (req, res, next) => {
    const { userId, productId, size, quantity } = req.body;
    try {
      const wishListItemToDeleteAndAddToCart = await deleteFromWishListAndAddToCart(userId, productId, size, quantity);
      res.send({
        message: "Item added to cart",
      });
    } catch (error) {
      throw error;
    }
  });

module.exports = wishListRouter;
