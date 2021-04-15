const client = require("./client");
const { createUser, createProducts, createReview } = require('./index')
async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS products_reviews;
        DROP TABLE IF EXISTS user_products;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;
    `);
    } catch (error) {
        throw error;
    }
}
async function createTables() {
    console.log("Starting to build tables...");
    try {
        await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        );
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            "creatorId" INTEGER REFERENCES users(id)
        );
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            description TEXT NOT NULL,
            "productId" INTEGER REFERENCES products(id)
        );
        CREATE TABLE user_products(
            "users_id" INTEGER REFERENCES users(id),
            "products_id" INTEGER REFERENCES products(id),
            UNIQUE("users_id", "products_id")
        );
        CREATE TABLE products_reviews(
            "reviews_id" INTEGER REFERENCES reviews(id),
            "products_id" INTEGER REFERENCES products(id),
            UNIQUE("reviews_id", "products_id")
        );
       `);
    } catch (error) {
        throw error;
    }
}
async function createInitialUsers() {
    console.log('Starting to create users...');
    try {
        const usersToCreate = [
            { username: 'albert', password: 'bertie99' },
            { username: 'sandra', password: 'sandra123' },
            { username: 'glamgal', password: 'glamgal123' },
        ]
        const users = await Promise.all(usersToCreate.map(createUser));
        console.log('Users created:');
        console.log(users);
        console.log('Finished creating users!');
    } catch (error) {
        console.error('Error creating users!');
        throw error;
    }
}
async function createInitialProducts() {
    console.log('Starting to create products...');
    try {
        const productsToCreate = [
            {
                name: 'Nike Sweatshirt',
                description: 'Red Nike Sweatshirt',
                creatorId: 1,
            },
            {
                name: 'Adidas Pants',
                description: 'Blue Adidas Pants',
                creatorId: 2,
            },
            {
                name: 'Nike Shoes',
                description: 'Air Jordans',
                creatorId: 3,
            }
        ]
        const products = await Promise.all(productsToCreate.map(product => createProducts(product)));
        console.log('Products created:');
        console.log(products);
        console.log('Finished creating products!');
    } catch (error) {
        throw error
    }
}
async function createInitialReviews() {
    console.log('Starting to create reviews...');
    try {
        const reviewsToCreate = [
            {
                description: ['Dope Red Sweatshirt'],
                productId: 1,
            },
            {
                description: ['Best Pants Ever', 'Okay pants... Tore easily'],
                productId: 2,
            },
            {
                description: ['Best shoes ever', 'super comfy', 'great support'],
                productId: 3,
            }
        ]
        const reviews = await Promise.all(reviewsToCreate.map(createReview));
        console.log('Reviews created:');
        console.log(reviews);
        console.log('Finished creating reviews!');
    } catch (error) {
        throw error
    }
}
async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialProducts();
        await createInitialReviews();
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
}
module.exports = {
    rebuildDB
};