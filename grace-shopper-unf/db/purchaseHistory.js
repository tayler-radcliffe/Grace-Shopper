const { getCartByuserId, deleteCartItemsAfterPurchase } = require("./cart");
const client = require("./client");
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const simpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser;

const mailFunction = async (currentCart, email, orderNumber, total, firstName, lastName, address, city, usState, zipCode) => {

  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: 'teamvividunf@gmail.com',
      pass: 'Teamvivid#2021'
    }
  }));

  const orderTotal = `<p>Order Total $${total}</p>`;
  const recipient = `<p> Shipping to: ${firstName} ${lastName}</p> `
  const shippingAddress = `<p>${address} ${city}, ${usState} ${zipCode}</p> </br>`

  let newparser = new MailParser(currentCart);
  const parsedCart = newparser.options;
  const cartArray = Object.values(parsedCart).map((i, idx) => `
<h4> item ${idx + 1} of ${parsedCart.length} </h4> 
<h5> Product Name: ${i.productName}</h5>
<p> Product Price: $ ${i.productPrice} </p>
<p> Product Size: ${i.size} </p>
<p> Product quantity: ${i.quantity} </p>`)
  const emailHtml = cartArray.toString();

  var mailOptions = {
    from: 'teamvividunf@gmail.com',
    to: `${email}`,
    subject: `Order Confirmation #${orderNumber} `,
    text: "Order conf",
    html: `${orderTotal} ${recipient} ${shippingAddress} ${emailHtml}`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}




async function addToRecentPurchases(userId, email, total, firstName, lastName, address, city, usState, zipCode) {
  const currentCart = await getCartByuserId(userId);
  const orderNumber = Math.floor(Math.random() * 10000000);
  await mailFunction(currentCart, email, orderNumber, total, firstName, lastName, address, city, usState, zipCode);

  const addingToPurchaseHistoryTable = async (
    userId,
    productName,
    productPrice,
    size,
    quantity,
    orderNumber
  ) => {
    try {
      const { rows: purchaseHistory } = await client.query(
        `
                INSERT INTO purchaseHistory("userId", "productName", "productPrice", "size", "quantity", "orderConfirmationNumber")
                VALUES($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `,
        [userId, productName, productPrice, size, quantity, orderNumber]
      );

      return purchaseHistory;
    } catch (error) {
      throw error;
    }
  };
  const cartEntry = await Promise.all(
    currentCart.map((product) =>
      addingToPurchaseHistoryTable(userId, product.productName, product.productPrice, product.size, product.quantity, orderNumber)
    )
  );
  const updatedStock = await Promise.all(
    currentCart.map((product) =>
      updateProductStock(product.productsId, product.quantity)
    )
  );

  await deleteCartItemsAfterPurchase(userId);

  const { rows: purchaseHistory } = await client.query(`
    SELECT * FROM purchaseHistory
    WHERE "userId" = $1;
  `, [userId])

  return purchaseHistory;
}


const getPurchaseHistoryByUserId = async (userId) => {
  try {
    const { rows: purchaseHistory } = await client.query(`
      SELECT * 
      FROM purchaseHistory
      WHERE "userId" = $1
    `, [userId])

    return purchaseHistory;
  } catch (error) {
    throw error
  }

}

const getAllPurchaseHistory = async () => {
  try {
    const { rows: purchaseHistory } = await client.query(`
      SELECT * 
      FROM purchaseHistory
    `)

    return purchaseHistory;
  } catch (error) {
    throw error
  }

}

const updateProductStock = async (productId, quantity) => {
  console.log("vvv", productId, quantity)

  try {
    const { rows: productStock } = await client.query(`
      SELECT "productStock"
      FROM products
      WHERE id = $1
    `, [productId]);

    const newStock = productStock[0].productStock - quantity;

    await updateStockHelper(productId, newStock);



  } catch (error) {
    throw error
  }
}

const updateStockHelper = async (productId, newStock) => {
  try {
    const { rows: products } = await client.query(`
    UPDATE products
    SET "productStock" = $2
    WHERE "id" = $1
    RETURNING *;
    `, [productId, newStock])
  } catch (error) {
    throw error
  }
}

module.exports = {
  addToRecentPurchases,
  getPurchaseHistoryByUserId,
  getAllPurchaseHistory
};
