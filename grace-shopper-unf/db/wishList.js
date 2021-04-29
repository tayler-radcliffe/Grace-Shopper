const { addNewProductToCart } = require("./cart");
const client = require("./client");

async function getWishListByUserId(userId){
    try {
        const {rows: wishList} = await client.query(`
            SELECT * 
            FROM wishList
            WHERE "userId" = $1;
        `, [userId])

        return wishList;
    } catch (error) {
        throw error;
    }
}

const addNewProductToWishList = async (userId, productId, size, productName, productPrice) => {
    try {
      const { rows: wishList } = await client.query(
        `
        INSERT INTO wishList("userId", "productsId", "size", "productName", "productPrice")
        VALUES($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [userId, productId, size, productName, productPrice]
      );
  
      return getWishListByUserId(userId);
    } catch (error) {
      throw error;
    }
  };

  const deleteItemFromWishList = async (userId, productId) => {
    try {
        const {
            rows: [wishList],
          } = await client.query(
            `
            DELETE FROM wishList
            where "userId" = $1 and "productsId" = $2
            RETURNING *;
              `,
            [userId, productId]
          );
      
    } catch (error) {
      throw error;
    }
  }

  const deleteFromWishListAndAddToCart = async (userId, productId, size, quantity) => {
    try {
        await addNewProductToCart(userId, productId, size, quantity);

        const {
            rows: [wishList],
          } = await client.query(
            `
            DELETE FROM wishList
            where "userId" = $1 and "productsId" = $2
            RETURNING *;
              `,
            [userId, productId]
          );
      
    } catch (error) {
      throw error;
    }
  }





module.exports = {
    getWishListByUserId,
    addNewProductToWishList,
    deleteItemFromWishList,
    deleteFromWishListAndAddToCart
  };