const client = require("./client");
const bcrypt = require('bcrypt');
const { getProductById } = require("./products");
const { user } = require("./client");


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

const getUser = async ({username, password}) => {
    try {
        const user = await getUserByUsername(username);
        const hashedPassword = user.password;
        const passwordsMatch = await bcrypt.compare(password, hashedPassword);
        if(passwordsMatch) {
            delete user.password;
            return user;
        } else {
            return ''
        } 
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const {rows: [user]} = await client.query(`
            SELECT * FROM users
            WHERE id = $1;
        `, [id]);

        delete user.password;
        return user;
    } catch (error) {
        throw error;
    }
}

const getUserByUsername = async (username) => {
    try {
        const {rows: [user]} = await client.query(`
            SELECT * FROM users
            WHERE username = $1;
        `, [username]);

        return user;
    } catch (error) {
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        const {rows: users} = await client.query(`
            SELECT * 
            FROM users;
        `);

        return users;
    } catch (error) {
        throw error;
    }
}

async function getProductsByUsername(username) {

    try {
      const { rows: products } = await client.query(
        `
        SELECT products.id
        FROM products
        JOIN user_products ON products.id = user_products.products_id
        JOIN users ON users.id = user_products.users_Id
        WHERE users.username=$1;
      `,
        [username]
      );
  
      return await Promise.all(products.map((product) => getProductById(product.id) )); 
      
    } catch (error) {
      throw error;
    }
  }

  async function insertFnLnEmail(userId, firstName, lastName, email) {
      try {
          const {rows: users } = await client.query(`
          UPDATE users
          SET "firstName" = $2, "lastName" = $3, "email" = $4
          WHERE id = $1
          RETURNING *
          `, [userId, firstName, lastName, email])

          return users;
      } catch (error) {
          throw error;
      }
  }

  async function insertData(username, firstName, lastName, email) {
    try {
        const {rows: users } = await client.query(`
        UPDATE users
        SET "firstName" = $2, "lastName" = $3, "email" = $4
        WHERE username = $1
        RETURNING *
        `, [username, firstName, lastName, email])

        return users;
    } catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const {rows: purchaseHistory} = await client.query(`
        DELETE FROM purchaseHistory
        WHERE "userId" = $1
        RETURNING *;
        `, [id]);
        const {rows: cart} = await client.query(`
        DELETE FROM cart
        WHERE "userId" = $1
        RETURNING *;
        `, [id]);
        const {rows: user_products} = await client.query(`
        DELETE FROM user_products
        WHERE "users_id" = $1
        RETURNING *;
        `, [id]);
        const {rows: products} = await client.query(`
        DELETE FROM products
        WHERE "creatorId" = $1
        RETURNING *;
        `, [id]);

        const {rows: [user]} = await client.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return user;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername,
    getAllUsers,
    getProductsByUsername,
    insertFnLnEmail,
    deleteUser, 
    insertData
}