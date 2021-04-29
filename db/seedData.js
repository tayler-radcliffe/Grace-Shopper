const { createCart, getCartByuserId, addNewProductToCart } = require("./cart");
const client = require("./client");
const { createUser, createProducts } = require('./index')
const { addToRecentPurchases } = require('./purchaseHistory');
const { insertFnLnEmail, insertData } = require("./users");
async function dropTables() {
    try {
        await client.query(`
        DROP TABLE IF EXISTS purchaseHistory;
        DROP TABLE IF EXISTS products_reviews;
        DROP TABLE IF EXISTS user_products;
        DROP TABLE IF EXISTS reviews;
        DROP TABLE IF EXISTS wishList;
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
            "productStock" INTEGER NOT NULL,
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
        CREATE TABLE wishList(
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            "productsId" INTEGER REFERENCES products(id),
            "size" TEXT,
            "productName" VARCHAR(255),
            "productPrice" INTEGER
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
            "quantity" INTEGER
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
            "orderConfirmationNumber" INTEGER,
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
                productStock: 100,
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
                productStock: 20,
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
                productStock: 4,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/732d00fe-c441-4eca-881f-936368da4df0/quest-3-mens-running-shoe-FHR8DM.png',
                reviews: []
            },
            {
                name: 'Nike Revolution 5',
                description: 'The Nike Revolution 5 cushions your stride with soft foam to keep you running in comfort. Lightweight knit material wraps your foot in breathable support, while a minimalist design fits in just about anywhere your day takes you.',
                creatorId: 1,
                price: 65,
                productStock: 100,
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
                productStock: 100,
                productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/81ce346008c0482e8d68ac7c010608f5_9366/Superstar_Shoes_White_FX5540_01_standard.jpg',
                reviews: [{
                    title: 'Dont Buy!',
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
                productStock: 10,
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
            {
                name: 'Nike ZoomX  Run Flyknit',
                description: 'Get after those long runs with the Nike ZoomX Invincible Run Flyknit. A lightweight and responsive foam delivers a super-soft feel and helps deliver energy with every step. Breathable and secure, its one of our most tested shoes. Lace up and feel the potential when your foot hits the pavement.',
                creatorId: 1,
                price: 180,
                productStock: 40,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/32156b26-3b2c-4147-a3a5-a2ed9f4280fe/zoomx-invincible-run-flyknit-womens-running-shoe-8v734r.png',
                reviews: [{
                    title: 'Bought these for my wife!',
                    stars: 5,
                    description: 'Definitely worth the $180!',
                    productId: 7,
                },
                {
                    title: 'Pretty good shoes, I love them',
                    stars: 4,
                    description: 'The sole on this shoe feels like heaven',
                    productId: 7,
                }
                ],
            },
            {
                name: 'DEFIANT GENERATION SHOES',
                description: 'Style and performance. You shouldnt have to choose between them on the tennis court. Thats why adidas created these Defiant Generation shoes. Their foot-hugging canvas upper and flexible Bounce midsole combine to keep you secure and comfortable. Underneath, a grippy multi-court outsole ensures your opponents have to work for every point.',
                creatorId: 2,
                price: 100,
                productStock: 21,
                productImage: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/1d3b4ce5adb54bc4949aac6400b459ca_9366/Defiant_Generation_Multicourt_Tennis_Shoes_Pink_FX7754.jpg',
                reviews: [{
                    title: 'Color is nice, support not so much',
                    stars: 3,
                    description: 'Could use more support in the soles',
                    productId: 8,
                }],
            },
            {
                name: 'Nike Air Force 1 07 Craft',
                description: 'The radiance lives on in the Nike Air Force 1 ’07 Craft, the b-ball icon that puts a fresh spin on what you know best: crisp leather, clean lines and the perfect amount of flash to make you shine. This iteration features a wild, crocodile-inspired texture on the Swoosh.',
                creatorId: 3,
                price: 120,
                productStock: 81,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/c2baa9a6-9d39-4c83-8010-b9c81b5bad0a/air-force-1-07-craft-mens-shoe-4nwHqx.png',
                reviews: []
            },
            {
                name: 'GRAND COURT SHOES',
                description: 'A 70s style reborn. These shoes take inspiration from iconic sport styles of the past and move them into the future. The shoes craft an everyday look with a leather-like upper. Signature 3-Stripes flash along the sides. Plush midsole cushioning gives comfort to every step.',
                creatorId: 1,
                price: 59,
                productStock: 21,
                productImage: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/a9112ea6e6f54b1081e1a981013683d3_9366/Grand_Court_Shoes_Black_F36484.jpg',
                reviews: [{
                    title: 'Really Good Tennis Shoes',
                    stars: 5,
                    description: 'Pretty good for the 1-2 weeks Ive had them!',
                    productId: 10,
                },
                {
                    title: 'Bought a size 6 of these',
                    stars: 3,
                    description: 'should have got a size 7',
                    productId: 10,
                }
                ],
            },
            {
                name: 'Nike Air Max Plus',
                description: 'Give your attitude an edge in your Nike Air Max Plus, a Tuned Air experience that gives you incredible stability and unbelievable cushioning. A prominent arch draws inspiration from a whales tail and gives it structure, while the iconic plastic fingers nod to palm trees and ocean waves. This version has airy mesh, a fiery gradient overlay and the familiar wavy design lines of the original, bringing that summer heat right to your kicks.',
                creatorId: 1,
                price: 160,
                productStock: 15,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fadf06db-4d9d-4e7f-b3a8-818bcd4066bb/air-max-plus-mens-shoe-x9G2xF.png',
                reviews: [{
                    title: 'Brand New Drop',
                    stars: 4,
                    description: 'Colors are super vibrant',
                    productId: 11,
                },
                {
                    title: 'Cant wait to get these in',
                    stars: 4,
                    description: 'will leave a better review once I recieve them!',
                    productId: 11,
                }
                ],
            },
            {
                name: 'SWIFT RUN X SHOES',
                description: 'Easy does it. Busy week or laid-back weekend, these Swift Run X Shoes are down for whatever youve got in mind. Borrowing elements from heritage adidas runners originally made for the track, this pair gives the look a fresh spin with a snug mesh upper and sleek welded details. Archive style has never been easier.',
                creatorId: 1,
                price: 85,
                productStock: 10,
                productImage: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/de9b31f3201445c89903aca700fc48ef_9366/Swift_Run_X_Shoes_Grey_FY5438.jpg',
                reviews: [{
                    title: 'Super comfortable running Shoes',
                    stars: 4,
                    description: 'Love these in the grey',
                    productId: 12,
                },
                {
                    title: 'Nice snug fit',
                    stars: 4,
                    description: 'Very comfortable',
                    productId: 12,
                }
                ],
            },
            {
                name: 'Nike Challenger OG',
                description: 'Nearly a 1-to-1 remake of the OG running shoe that offered runners a distinct look in the 70s, the Nike Challenger OG marries soft suedes, shimmering fabric and breathable mesh. Plush padding around the ankle combines with its sleek, springy midsole to make it the comfy trendsetter—the diamond from underground.',
                creatorId: 1,
                price: 90,
                productStock: 85,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/1f12b82e-f701-4f5a-baf2-9c0809e29f00/challenger-og-mens-shoe-wrhSPb.png',
                reviews: [{
                    title: 'Impressed',
                    stars: 5,
                    description: 'Excellent Shoe. Squishy like some people have reviewed, but because of the wide toe box it is forgiveable',
                    productId: 13,
                },
                {
                    title: 'Great Shoes!',
                    stars: 4,
                    description: 'Delivered early and better than they looked online, very happy. Pleased to get half size fit perfectly.',
                    productId: 13,
                }
                ],
            },
            {
                name: 'GEODIVER PRIMEBLUE SHOES',
                description: 'Style or planet? No need to pick sides. Lace into the streamlined design of these sporty shoes and join in adidas commitment to help end plastic waste. Their minimalist upper is made with recycled materials and a partially recycled EVA midsole that keeps you walking on clouds. Sometimes, less is more.',
                creatorId: 2,
                price: 90,
                productStock: 80,
                productImage: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/2c0d27f7f7f8473a9504acc900dc5160_9366/Geodiver_Primeblue_Shoes_White_FZ4687.jpg',
                reviews: [{
                    title: 'So stylish',
                    stars: 4,
                    description: 'So happy to buy it I recommend it and you can match it easily',
                    productId: 14,
                }],
            },
            {
                name: 'Nike React Miler 7',
                description: 'When running becomes a daily habit, stability and comfort are crucial. The Nike React Miler 2 delivers, bringing back the cushioning and intuitive design of its predecessor. Its redesigned upper helps cut down on the bulk, offering support and a secure feel on long and short runs.',
                creatorId: 3,
                price: 130,
                productStock: 81,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/74bbeb85-a70f-46ca-a226-47ac64ad829c/react-miler-2-womens-running-shoe-js2rqJ.png',
                reviews: []
            },
            {
                name: 'ULTRABOOST DNA CC_1 SHOES',
                description: 'Icons collide. For this version of the Ultraboost, we pulled inspiration from our cult-favorite adidas Climacool Shoes. Wear these running shoes for your daily miles or as everyday trainers. The soft adidas Primeknit upper features aerodynamic air channels, keeping you cool when the temperature rises. The Boost outsole offers comfort youll have to feel to believe.',
                creatorId: 1,
                price: 59,
                productStock: 21,
                productImage: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/8f81a0a6bf5342a7b2d1ac9200ec7590_9366/Ultraboost_DNA_CC_1_Shoes_White_H05261.jpg',
                reviews: [{
                    title: 'Great shoes and really breathable!',
                    stars: 5,
                    description: 'I really enjoy these shoes! I can walk 10 miles a day in them and be completely comfortable.',
                    productId: 16,
                },
                {
                    title: 'Comfortable beyond imagination and with aesthetics to match. Great product!',
                    stars: 3,
                    description: 'Favorite shoe purchase to date, gonna buy another pair!',
                    productId: 16,
                }
                ],
            },
            {
                name: 'Nike Air  Kiger 7',
                description: 'Run the trail in the Nike Air Zoom Terra Kiger 7. Fast and lightweight, the shoe delivers a breathable and secure feel as you race over rocky paths. Updated traction lugs provide stability for your downhill miles.',
                creatorId: 1,
                price: 160,
                productStock: 15,
                productImage: 'https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/7e988164-59f0-413b-98f8-8e1e60dbad71/air-zoom-terra-kiger-7-womens-trail-running-shoe-WtgNN6.png',
                reviews: [{
                    title: 'Fit a lot smaller than other ultraboost',
                    stars: 3,
                    description: 'This isn’t one you can just slide on in my opinion, but it looks great fresh out the box, sizing is snug but I’m just going to wear a thinner sock',
                    productId: 17,
                },
                {
                    title: 'They fit a little snug but i absolutely love this shoe!',
                    stars: 4,
                    description: 'I absolutely love the quality and the unique traits of the shoe as it is 100% recycled and non-dyed, however I was surprised by the fit.',
                    productId: 17,
                }
                ],
            },
            {
                name: 'ULTRABOOST SHOES',
                description: 'This Ultraboost is part of our Made To Be Remade service. You wear it out. Return it. And we reuse the materials in something new.',
                creatorId: 1,
                price: 85,
                productStock: 10,
                productImage: 'https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/b6f7f9edea7644b395dcac79009949cf_9366/Made_To_Be_Remade_Ultraboost_Shoes_White_FV7827_01_standard.jpg',
                reviews: [{
                    title: 'Overall A Great Shoe',
                    stars: 4,
                    description: 'The shoe is great, I just am not a fan of the ultra thing tongue on it.',
                    productId: 18,
                },
                {
                    title: 'Bought these for my husband when they were on sale. He absolutely loves them.',
                    stars: 4,
                    description: 'I would recommend these for a decent priced comfortable walking running shoe.',
                    productId: 18,
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
            productImage: product.productImage,
            productStock: product.productStock
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
        await insertData("albert", 'Albert', 'Smith', "ALSmith@gmail.com");
        await insertData("sandra", 'Sandra', 'Dominguez', "SallyD@yahoo.com");
        await insertData("glamgal", 'Gertrude', 'Jones', "GerdyJones@aol.com");
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
        await addToRecentPurchases(1, 'totallyfakeemail@gmail.com');
        await addToRecentPurchases(2, 'totallyfakeemail@gmail.com');
        await addToRecentPurchases(3, 'totallyfakeemail@gmail.com');
    } catch (error) {
        console.log('Error during rebuildDB')
        throw error;
    }
}
module.exports = {
    rebuildDB
};
