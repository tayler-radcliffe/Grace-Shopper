const client = require("./client");

const createProducts = async ({ name, description, creatorId }) => {
    try {
        const { rows: [products] } = await client.query(`
            INSERT INTO routines(name, description, creatorId)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [name, description, creatorId]);
        return products;
    } catch (error) {
        throw error
    }
}
module.exports = {
    createProducts,
}