export async function fetchProducts() {
  try {
    const response = await fetch(`http://localhost:3000/api/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchProductById(productId) {
  console.log(productId);
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/${productId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addItemsToCart(userId, productId, size, quantity) {
  console.log(userId, productId, size, quantity);
  try {
    const response = await fetch(`http://localhost:3000/api/cart/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        size: size,
        quantity: quantity,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCartData(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchLoggedInUser(username, password) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerUser(username, password) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createInitialEmptyCart(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function submitOrder(userId, email, total, firstName, lastName, address, city, usState, zipCode) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        email, 
        total, 
        firstName, 
        lastName, 
        address, 
        city, 
        usState, 
        zipCode
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserData(username) {
  try {
    const response = await fetch(`http://localhost:3000/api/users/${username}/personal`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchPurchaseHistory(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/purchaseHistory/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteProductFromCart(userId, productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAverageReviews(productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/ratings/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function quantityUpdate(quantity, productsId, userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/cart/quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity,
        productsId,
        userId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllUsers() {
  try {
    const response = await fetch(`http://localhost:3000/api/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllPurchases() {
  try {
    const response = await fetch(`http://localhost:3000/api/cart`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchWishListByUserId(userId) {
  try {
    const response = await fetch(`http://localhost:3000/api/wishList/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addProductToWishList(userId, productId, size, productName, productPrice) {
  try {
    const response = await fetch(`http://localhost:3000/api/wishList/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        size,
        productName,
        productPrice
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteItemFromUserWishList(userId, productId) {
  console.log(productId)
  try {
    const response = await fetch(`http://localhost:3000/api/wishList/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export async function addToCartFromWishList(userId, productId, size, quantity) {
  try {
    const response = await fetch(`http://localhost:3000/api/wishList/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId, 
        productId, 
        size, 
        quantity
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


export async function updateProduct(productId, name, description, price, productStock) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, 
        description, 
        price, 
        productStock
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addNewProduct(name, description, creatorId, price, reviews = [], productImage, productStock) {
  try {
    const response = await fetch(`http://localhost:3000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name, 
        description, 
        creatorId, 
        price, 
        reviews, 
        productImage, 
        productStock
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addReviewToProduct(title, stars, description, productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title, 
        stars, 
        description, 
        productId
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchProductIdFromProductName(productName) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/id/${productName}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}