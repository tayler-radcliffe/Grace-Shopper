const { getCartByuserId, deleteCartItemsAfterPurchase } = require("./cart");
const client = require("./client");

async function addToRecentPurchases(userId) {
  const currentCart = await getCartByuserId(userId);
  console.log("DDD", currentCart);

  const addingToPurchaseHistoryTable = async (
    userId,
    productName,
    productPrice,
    size,
    quantity
  ) => {
    try {
      const { rows: purchaseHistory } = await client.query(
        `
                INSERT INTO purchaseHistory("userId", "productName", "productPrice", "size", "quantity")
                VALUES($1, $2, $3, $4, $5)
                RETURNING *;
            `,
        [userId, productName, productPrice, size, quantity]
      );

      return purchaseHistory;
    } catch (error) {
      throw error;
    }
  };
  const cartEntry = await Promise.all(
    currentCart.map((product) =>
      addingToPurchaseHistoryTable(userId, product.productName, product.productPrice, product.size, product.quantity)
    )
  );

  await deleteCartItemsAfterPurchase(userId);

  const {rows: purchaseHistory} = await client.query(`
    SELECT * FROM purchaseHistory
    WHERE "userId" = $1;
  `, [userId])

  return purchaseHistory;
}

module.exports = {
  addToRecentPurchases,
};
