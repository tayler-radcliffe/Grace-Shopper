import React, { useState, useEffect } from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FaStar } from 'react-icons/fa';


export default function product({ product, setProducts, productId, setSearchTerm, rating, setRating, hover, setHover }) {

    // const handleTags = async (event, tagName) => {
    //     event.preventDefault();
    //     setSearchTerm(tagName);
    // }

    return (
        <div key={productId}>
            <body className=".body" style={{ marginTop: '200px', flex: '0 33%' }}>
                <div class="card__container">
                    <div class="card__top__section">
                        <img src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b04a4a80-ef34-4344-a2dc-48a7e563758a/kyrie-7-chinese-new-year-basketball-shoe-5Kj9Lr.jpg" />
                    </div>
                    <div class="card__body__section">
                        <p>Nike Epic React Flyknit</p>
                        <span>The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. </span>
                    </div>
                    <div>
                        <div class="rating-section">
                            <div class="stars-rating">
                                {[...Array(5)].map((star, idx) => {
                                    const ratingValue = idx + 1;
                                    return (<label>
                                        <input type="radio"
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
                                <span>$85.00</span>
                                <div>
                                    <ShoppingCartIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}