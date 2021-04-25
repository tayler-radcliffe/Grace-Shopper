import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FaStar } from 'react-icons/fa';
import './Product.css';
import { addItemsToCart } from "./api";


import { Link } from 'react-router-dom';
export default function Product({ product, setProducts, productId, setSearchTerm, rating, setRating, hover, setHover, individualProductId, setIndividualProductId }) {


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
                            <img src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a90cb62b-8083-4a6c-a556-54f1cc271766/wildhorse-7-mens-trail-running-shoe-rJ6R7V.png" alt="products" />
                        </div>
                    </Link>
                    <div class="card__body__section">
                        <p>{product.name}</p>
                        <span>{product.description} </span>
                    </div>
                    <div>
                        <div class="rating-section">
                            <div class="stars-rating">
                                {[...Array(5)].map((star, idx) => {
                                    const ratingValue = idx + 1;
                                    return (<label>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={ratingValue}
                                            onClick={() => setRating(ratingValue)}
                                        />
                                        <FaStar className="star" size={15} color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                            onMouseEnter={() => setHover(ratingValue)}
                                            onMouseLeave={() => setHover(null)} /></label>
                                    )
                                })}
                                <div style={{ fontSize: '13px' }}>{rating} out of 5 stars</div>
                            </div>
                            <div class="c-price">
                                <span>${product.price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div >
    )
}