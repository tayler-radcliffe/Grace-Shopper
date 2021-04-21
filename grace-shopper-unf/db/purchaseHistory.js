const { getCartByuserId, deleteCartItemsAfterPurchase } = require("./cart");
const client = require("./client");

async function addToRecentPurchases(userId) {
  const currentCart = await getCartByuserId(userId);
  console.log("BBB", currentCart);

  const addingToPurchaseHistoryTable = async (
    userId,
    productName,
    productPrice
  ) => {
    try {
      const { rows: purchaseHistory } = await client.query(
        `
                INSERT INTO purchaseHistory("userId", "productName", "productPrice")
                VALUES($1, $2, $3)
                RETURNING *;
            `,
        [userId, productName, productPrice]
      );

      return purchaseHistory;
    } catch (error) {
      throw error;
    }
  };
  const cartEntry = await Promise.all(
    currentCart.map((product) =>
      addingToPurchaseHistoryTable(userId, product.name, product.price)
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
