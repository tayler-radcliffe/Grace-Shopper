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

// export async function getUser(username) {
//     fetch(`http://localhost:3000/api/users/${username}/personal`, {
//     }).then(response => response.json())
//         .then(result => {
//             console.log(result);
//         })
//         .catch(console.error);
// }

export async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
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
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}


export async function addItemsToCart(userId, productId, size, quantity) {
    console.log(userId, productId, size, quantity)

    try {
        const response = await fetch(`http://localhost:3000/api/cart/addProduct`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                productId: productId,
                size: size,
                quantity: quantity
            })
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

