import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Product.css';
import { addItemsToCart } from "./api";


import { Link } from 'react-router-dom';
export default function Product({ product, setProducts, productId, setSearchTerm, rating, setRating, hover, setHover, individualProductId, setIndividualProductId }) {

    console.log(product);

    return (
        <div title="Products"
            dark={false}
            id="section2"
            key={productId}
            className="wrapper">
            <body>
                <div class="card__container">
                    <Link to={`/products/${productId}`}>
                        <div class="card__top__section">
                            <img src={product.productImage} alt="products" />
                        </div>
                    </Link>
                    <div class="card__body__section">
                        <p>{product.name}</p>
                        <span>{product.description} </span>
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'center', fontSize: '20px' }} class="c-price">
                            <span>${product.price}.00</span>
                        </div>
                    </div>
                </div>
            </body>
        </div >
    )
}