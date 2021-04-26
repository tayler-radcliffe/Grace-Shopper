const { createCart, getCartByuserId, addNewProductToCart } = require("./cart");
const client = require("./client");
const { createUser, createProducts } = require('./index')
const { addToRecentPurchases } = require('./purchaseHistory');
const { insertFnLnEmail } = require("./users");
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
            "creatorId" INTEGER REFERENCES users(id),
            "productImage" VARCHAR(255)
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
            "productsId" INTEGER REFERENCES products(id),
            "size" TEXT,
            "productName" VARCHAR(255),
            "productPrice" INTEGER,
            "productDescription" TEXT,
            quantity INTEGER
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
            "productName" TEXT,
            "productPrice" INTEGER,
            "size" TEXT,
            "quantity" INTEGER,
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
            { username: 'VividAdmin', password: 'Vivid2021' }
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
                name: 'ZX 1K BOOST SHOES',
                description: 'In a constantly evolving world, keeping up is just part of the routine. Stay on top of it in these airy knit mesh adidas shoes. The ZX series has merged technology with culture since the 80s. Today a combination of Boost and EVA cushioning keeps you comfortable as you charge through the day.',
                creatorId: 1,
                price: 100,
                productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/10dfabb1c1fc4c03ad9bac8500bb283d_9366/ZX_1K_Boost_Shoes_Blue_H68719_01_standard.jpg',
                reviews: [{
                    title: 'Best Shoes',
                    stars: 5,
                    description: 'I would buy these in every color they have, they are awesome',
                    productId: 1,
                },
                {
                    title: 'Good for the price',
                    stars: 4,
                    description: 'Bought these shoes for my brother, he loved them',
                    productId: 1,
                }
                ],
            },
            {
                name: 'MULTIX SHOES',
                description: 'Casual doesnt have to mean ordinary. Keep your look chill, but change it up with the standout style of these adidas Multix Shoes. A sporty mesh upper keeps your feet comfy as you take on whatever the day holds.',
                creatorId: 2,
                price: 80,
                productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/27e49d80825e4db69da7ac4400b99f7f_9366/Multix_Shoes_Beige_FX5354_01_standard.jpg',
                reviews: [{
                    title: 'Average Shoes',
                    stars: 3,
                    description: 'Could use more support in the soles, but otherwise pretty good',
                    productId: 2,
                }],
            },
            {
                name: 'Nike Quest 3',
                description: 'The Nike Quest 3 delivers functional versatility for the committed runner. Its streamlined design features layers of material to help you stay cool and secure. Increased foam heights give you more responsiveness for comfort on every mile.',
                creatorId: 3,
                price: 46,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/732d00fe-c441-4eca-881f-936368da4df0/quest-3-mens-running-shoe-FHR8DM.png',
                reviews: []
            },
            {
                name: 'Nike Revolution 5',
                description: 'The Nike Revolution 5 cushions your stride with soft foam to keep you running in comfort. Lightweight knit material wraps your foot in breathable support, while a minimalist design fits in just about anywhere your day takes you.',
                creatorId: 1,
                price: 65,
                productImage: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/706c9f18-41f7-4698-96cb-d278601cf7fb/revolution-5-mens-running-shoe-TzTL9k.png',
                reviews: [{
                    title: 'Best Shoes on the Planet',
                    stars: 5,
                    description: 'If you need some really good shoes, buy these',
                    productId: 4,
                },
                {
                    title: 'Extra Wide',
                    stars: 3,
                    description: 'pretty good pair for extra wide',
                    productId: 4,
                }
                ],
            },
            {
                name: 'SUPERSTAR SHOES',
                description: 'To be a true creator, sometimes you have to break the rules. Lace up in these adidas Superstar Shoes and do just that. An icon on the hardwood, the arena stage and the streets, this pair encourages you to color outside the lines with an artistic sketch design that reimagines the beloved Trefoil. The clean leather upper and recognizable rubber shell toe pay tribute to the original design from the 70s',
                creatorId: 1,
                price: 90,
                productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/81ce346008c0482e8d68ac7c010608f5_9366/Superstar_Shoes_White_FX5540_01_standard.jpg',
                reviews: [{
                    title: 'Don&#x27;t Buy!',
                    stars: 3,
                    description: 'Colors are nice, but worn out quickly',
                    productId: 5,
                },
                {
                    title: 'Not Worth',
                    stars: 3,
                    description: 'Bottoms worn off with the first couple wears',
                    productId: 5,
                }
                ],
            },
            {
                name: 'RUN 60S 2.0 SHOES',
                description: 'Heritage adidas vibes come through strong in these running-inspired sneakers. Bringing together the best of classic track design and the clean lines of modern streetwear, they have a timeless feel thats easy to pair with your day-to-day look. A Cloudfoam midsole provides super-soft steps as you move through it all.',
                creatorId: 1,
                price: 50,
                productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/c709afcf71004d32b3f6ac0200fc28fa_9366/Run_60s_2.0_Shoes_White_FZ0959_01_standard.jpg',
                reviews: [{
                    title: 'Mom Shoes',
                    stars: 4,
                    description: 'Super Gold, Super Sparkly',
                    productId: 6,
                },
                {
                    title: 'The Dash Grey is the best color',
                    stars: 3,
                    description: 'Out of all the colors, I think Dash Grey is the best!',
                    productId: 6,
                }
                ],
            },
        ]
        const products = await Promise.all(productsToCreate.map(product => createProducts({
            name: product.name,
            description: product.description,
            creatorId: product.creatorId,
            price: product.price,
            reviews: product.reviews,
            productImage: product.productImage
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
                    size: 'medium',
                    quantity: 1,
                },
                {
                    productId: 2,
                    size: 'large',
                    quantity: 2,
                },
                {
                    productId: 3,
                    size: '12',
                    quantity: 1,
                }]
            },
            {
                userId: 2,
                productIds: [{
                    productId: 2,
                    size: 'medium',
                    quantity: 3,
                },
                {
                    productId: 3,
                    size: '11.5',
                    quantity: 1,
                }]
            },
            {
                userId: 3,
                productIds: [{
                    productId: 2,
                    size: 'medium',
                    quantity: 3,
                },
                {
                    productId: 3,
                    size: '11.5',
                    quantity: 1,
                }]
            },
        ]

        const carts = await Promise.all(cartsToCreate.map(cart => createCart({ userId: cart.userId, productIds: cart.productIds })))

        console.log('Cart created:');
        console.log(carts);
        console.log('Finished creating carts!');
        const testTwo = await getCartByuserId(1);
        const testThree = await getCartByuserId(2);
        await addNewProductToCart(1, 1, "12", 1);
        await addNewProductToCart(2, 1, "10", 1);
        await addNewProductToCart(3, 1, "11", 1);
        await addNewProductToCart(2, 2, "9", 1);
        await addNewProductToCart(3, 2, "8", 1);
        await addNewProductToCart(3, 3, "6", 1);
    } catch (error) {
        throw error;
    }

}

async function insertUserInfo() {
    try {
        await insertFnLnEmail(1, 'Albert', 'Smith', "ALSmith@gmail.com");
        await insertFnLnEmail(2, 'Sandra', 'Dominguez', "SallyD@yahoo.com");
        await insertFnLnEmail(3, 'Gertrude', 'Jones', "GerdyJones@aol.com");
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
        await insertUserInfo();
        await addToRecentPurchases(1);
        await addToRecentPurchases(2);
        await addToRecentPurchases(3);
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
}
module.exports = {
    rebuildDB
};