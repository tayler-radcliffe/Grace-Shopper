const client = require("./client");
const { createReview } = require("./reviews");

const createProducts = async ({ name, description, creatorId, price, reviews }) => {
  try {
    const { rows: [products] } = await client.query(`
            INSERT INTO products(name, description, "creatorId", price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [name, description, creatorId, price]);

    if (!reviews) {
      return products;
    }
    const reviewList = await Promise.all(reviews.map(review => createReview(review)));



    return await addReviewsToProducts(products.id, reviewList, products.creatorId);
  } catch (error) {
    throw error
  }
}

const addNewReviewToProduct = async (productId, newReview) => {
  try {
    const review = await createReview(newReview);

    await createProductReviewLink(productId, review.id);

    return await getProductById(productId);

  } catch (error) {
    throw error;
  }

}


const addReviewsToProducts = async (productId, reviewList, creatorId) => {

  try {
    const reviewPromises = reviewList.map((review) =>
      createProductReviewLink(productId, review.id)
    );

    await createProductUserLink(productId, creatorId);
    await Promise.all(reviewPromises);

    return await getProductById(productId);

  } catch (error) {
    throw error;
  }

}

const createProductUserLink = async (productId, creatorId) => {
  try {
    const { rows: users } = await client.query(`
        INSERT INTO user_products("users_id", "products_id")
        VALUES($1, $2)
        ON CONFLICT(users_id, products_id) DO NOTHING
      `, [creatorId, productId])
  } catch (error) {
    throw error
  }
}

const createProductReviewLink = async (productId, reviewId) => {
  try {
    const { rows: reviews } = await client.query(`
        INSERT INTO products_reviews("reviews_id", "products_id")
        VALUES($1, $2)
        ON CONFLICT(reviews_id, products_id) DO NOTHING
      `, [reviewId, productId])
  } catch (error) {
    throw error
  }
}

const getProductById = async (productId) => {

  const { rows: [products] } = await client.query(`
      SELECT * FROM products
      WHERE id = $1
    `, [productId]);

  if (!products) {
    throw {
      name: "ProductNotFoundError",
      message: "Could not find a product with that productId"
    };
  }

  const { rows: reviews } = await client.query(`
      SELECT reviews.*
      FROM reviews
      JOIN products_reviews ON reviews.id = products_reviews.reviews_id
      WHERE products_reviews.products_id = $1
    `, [productId]);

  products.reviews = reviews;

  return products;
}

const getProductByName = async (productName) => {
  const { rows: [products] } = await client.query(`
      SELECT * FROM products
      WHERE name = $1
    `, [productName]);

  if (!products) {
    throw {
      name: "ProductNotFoundError",
      message: "Could not find a product with that productId"
    };
  }

  const { rows: reviews } = await client.query(`
      SELECT reviews.*
      FROM reviews
      JOIN products_reviews ON reviews.id = products_reviews.reviews_id
      WHERE products_reviews.products_id = $1
    `, [productName]);

  products.reviews = reviews;

  return products;
}

const getAllProducts = async () => {
  try {
    const { rows: products } = await client.query(`
            SELECT * 
            FROM products;
        `);

    const mappedProducts = await Promise.all(products.map(product => getProductById(product.id)));
    return mappedProducts;
  } catch (error) {
    throw error;
  }
}

const updateProducts = async ({ id, name, description, price }) => {

  try {
    const { rows: [products] } = await client.query(`
          UPDATE products
          SET name = $2, description = $3, price = $4
          WHERE id = $1
          RETURNING *
      `, [id, name, description, price]);

    return products;
  } catch (error) {
    throw error;
  }
}

const deleteProduct = async (id) => {
  try {
    const { rows: [products] } = await client.query(`
          DELETE FROM products
          WHERE id = $1
          RETURNING *;
      `, [id]);

    return products;
  } catch (error) {
    throw error;
  }
}



module.exports = {
  createProducts,
  getProductById,
  getProductByName,
  addReviewsToProducts,
  getAllProducts,
  updateProducts,
  deleteProduct,
  addNewReviewToProduct,
}