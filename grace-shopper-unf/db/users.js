const client = require("./client");
const bcrypt = require('bcrypt');
const createUser = async ({ username, password }) => {
    try {
        const SALT_COUNT = 10;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
        const { rows: [user] } = await client.query(`
            INSERT INTO users(username, password)
            VALUES ($1, $2)
            RETURNING *;
        `, [username, hashedPassword]);
        password = hashedPassword;
        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createUser,
}