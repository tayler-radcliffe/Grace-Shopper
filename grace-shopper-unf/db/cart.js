const client = require("./client");
const { getProductById } = require("./products");

async function createCart({ userId, productIds }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            INSERT INTO cart("userId")
            VALUES ($1)
            ON CONFLICT("userId") DO NOTHING
            RETURNING *;
        `,
      [userId]
    );

    if (!productIds) {
      return;
    }

    const productList = await Promise.all(
      productIds.map((product) =>
        createCartProductList(cart.id, product.productId, userId)
      )
    );

    return await Promise.all(productIds.map(product => getProductById(product.productId)));
  } catch (error) {
    throw error;
  }
}

async function createCartProductList(cartId, productId, userId) {
  try {
    const {
      rows: [cartProducts],
    } = await client.query(
      `
            INSERT INTO cartProducts("cartId", "productsId", "userId")
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [cartId, productId, userId]
    );

    return cartProducts;
  } catch (error) {
    throw error;
  }
}

const getCartByuserId = async (userId) => {
  try {
    const { rows: cartProducts } = await client.query(
      `
    Select * 
    FROM cartProducts
    WHERE "userId" = $1;
    `,
      [userId]
    );

    const cartObject = cartProducts.map((product) => product.productsId);

    const productsInCart = await Promise.all(
      cartObject.map((productId) => getProductById(productId))
    );

    return productsInCart;
  } catch (error) {
    throw error;
  }
};

const addNewProductToCart = async (userId, productId) => {
  try {
    const { rows: cart } = await client.query(
      `
        SELECT id 
        FROM cart
        WHERE "userId" = $1;
      `,
      [userId]
    );

    const cartId = cart.map((item) => item.id);
    await createCartProductList(cartId[0], productId, userId);

    return getCartByuserId(userId);
  } catch (error) {
    throw error;
  }
};

const deleteProductFromCart = async (userId, productId) => {
  try {
    const { rows: cart } = await client.query(
      `
      SELECT id 
      FROM cart
      WHERE "userId" = $1;
    `,
      [userId]
    );

    const cartId = cart.map((item) => item.id);

    const {
      rows: [cartProducts],
    } = await client.query(
      `
      DELETE FROM cartProducts
      where "userId" = $1 and "productsId" = $2
      RETURNING *;
        `,
      [userId, productId]
    );
      
    return cartProducts;
  } catch (error) {
    throw error;
  }
};

const deleteCartItemsAfterPurchase = async (userId) => {
  try {
    const {rows: cartProducts} = await client.query(`
    DELETE FROM cartProducts
    where "userId" = $1
    RETURNING *;
    `, [userId]);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCart,
  getCartByuserId,
  addNewProductToCart,
  deleteProductFromCart,
  deleteCartItemsAfterPurchase,
};
