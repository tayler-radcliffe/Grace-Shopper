const client = require('./client');
const createReview = async ({ description, productId }) => {
    try {
        const { rows: [reviews] } = await client.query(`
            INSERT INTO reviews(description, "productId")
            VALUES ($1, $2)
            RETURNING *;
        `, [description, productId]);
        return reviews;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createReview,
}