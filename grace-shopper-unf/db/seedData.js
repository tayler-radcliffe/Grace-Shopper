const { createCart, getCartByuserId, addNewProductToCart } = require("./cart");
const client = require("./client");
const { createUser, createProducts } = require('./index')
const {addToRecentPurchases} = require('./purchaseHistory')
async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS purchaseHistory;
        DROP TABLE IF EXISTS products_reviews;
        DROP TABLE IF EXISTS user_products;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS cartProducts;
        DROP TABLE IF EXISTS cart;
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
            password VARCHAR(255) NOT NULL,
            "firstName" VARCHAR(255),
            "lastName" VARCHAR(255),
            "email" VARCHAR(255) UNIQUE
        );
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            "price" INTEGER NOT NULL,
            "creatorId" INTEGER REFERENCES users(id)
        );
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            "stars" INTEGER,
            description TEXT NOT NULL,
            "productsId" INTEGER REFERENCES products(id)
        );
        CREATE TABLE cart(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id) UNIQUE
        );
        CREATE TABLE cartProducts(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "cartId" INTEGER REFERENCES cart(id),
            "productsId" INTEGER REFERENCES products(id)
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
        CREATE TABLE purchaseHistory(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "productName" TEXT NOT NULL,
            "productPrice" INTEGER,
            "date" DATE DEFAULT CURRENT_TIMESTAMP
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
                price: 50,
                reviews: [{   
                    title: 'Best Sweatshirt',
                    stars: 5,
                    description: 'Dope Red Sweatshirt',
                    productId: 1,
                }, 
                {   
                    title: 'Worst Sweatshirt',
                    stars: 0,
                    description: 'terrible Red Sweatshirt',
                    productId: 1,
                }
            ],
            },
            {
                name: 'Adidas Pants',
                description: 'Blue Adidas Pants',
                creatorId: 2,
                price: 35,
                reviews: [{
                    title: 'Best Pants',
                    stars: 4,
                    description: 'Best Pants Ever',
                    productId: 2,
                }],
            },
            {
                name: 'Nike Shoes',
                description: 'Air Jordans',
                creatorId: 3,
                price: 100,
                reviews: []
            }
        ]
        const products = await Promise.all(productsToCreate.map(product => createProducts({
            name: product.name,
            description: product.description,
            creatorId: product.creatorId,
            price: product.price,
            reviews: product.reviews,
        })));
        console.log('Products created:');
        console.log(products);
        console.log('Finished creating products!');
    } catch (error) {
        throw error
    }
}

async function createInitialCart() {

    try {
        const cartsToCreate = [
            {
                userId: 1,
                productIds: [{
                    productId: 1,
                },
                {
                    productId: 2,
                },
                {
                    productId: 3, 
                }]
            },
            {
                userId: 2,
                productIds: [{
                    productId: 2,
                },
                {
                    productId: 3, 
                }]
            },
        ]

        const carts = await Promise.all(cartsToCreate.map(cart => createCart({userId: cart.userId, productIds: cart.productIds})))

        console.log('Cart created:');
        console.log(carts);
        console.log('Finished creating carts!');
        const testTwo = await getCartByuserId(1);
        const test = await addNewProductToCart(2, 1);
    } catch (error) {
        throw error;
    }

}


async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialProducts();
        await createInitialCart();
        // await addToRecentPurchases(1);
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
}
module.exports = {
    rebuildDB
};