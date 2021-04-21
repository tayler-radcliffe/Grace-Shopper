import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { FaStar } from 'react-icons/fa';

export default function FeaturedProducts({ rating, setRating, hover, setHover }) {

    const imageSource1 = "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F04%2Fadidas-originals-2017-spring-summer-apparel-1.jpg?q=90&w=1400&cbr=1&fit=max"
    const imageSource2 = "https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    const imageSource3 = "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"

    return (
        <div>
            <body>
                <div className="box">
                    <div className="card">
                        <div className="imgBx">
                            <img src={imageSource1} alt="images" />
                        </div>
                        <div class="details">
                            <h2>Adidas Collection<br /><span>Originals</span></h2>
                        </div>
                    </div>

                    <div className="card">
                        <div className="imgBx">
                            <img src={imageSource3} alt="images" />
                        </div>
                        <div className="details">
                            <h2>Nike Collection<br /><span>Killshot 2's</span></h2>
                        </div>
                    </div>

                    <div className="card">
                        <div className="imgBx">
                            <img src={imageSource2} alt="images" />
                        </div>
                        <div className="details">
                            <h2>Adidas Collection<br /><span>Prime V</span></h2>
                        </div>
                    </div>

                </div>
            </body>
            <div className="featuredProductsText" style={{ fontSize: '30px', position: 'relative', top: '50px' }}>
                Featured Products
        </div>
            <div className="featuredProductCardsWrapper" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 500px))',
                justifyContent: 'center'

            }}>
                <body className=".body" style={{ marginTop: '100px' }}>
                    <div className="card__container">
                        <div className="card__top__section">
                            <img alt="images" src="https://brand.assets.reebok.com/image/upload/f_auto,q_auto,fl_lossy/reebok_enUS/Images/C22816_21SS_Reebok_Identity_Mens_DESKTOP_In-Grid_tcm274-585185.jpg" />
                        </div>
                        <div className="card__body__section">
                            <p>Nike Epic React Flyknit</p>
                            <span>The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. </span>
                        </div>
                        <div>
                            <div className="rating-section">
                                <div className="stars-rating">
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
                                <div className="c-price">
                                    <span>$85.00</span>
                                    <div>
                                        <ShoppingCartIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <body className=".body" style={{ marginTop: '200px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/b04a4a80-ef34-4344-a2dc-48a7e563758a/kyrie-7-chinese-new-year-basketball-shoe-5Kj9Lr.jpg" />
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
                <body className=".body" style={{ marginTop: '100px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://i.pinimg.com/originals/8e/86/3b/8e863baaa4943e4e40194d3fae6dbc24.jpg" />
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
                <body className=".body" style={{ marginTop: '100px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/76b3a645-fedf-42ef-87a8-ac1958e22913/sportswear-mens-t-shirt-z6fbxW.png" />
                        </div>
                        <div class="card__body__section">
                            <p>Nike T-Shirt</p>
                            <span>The Nike Originals T-Shirt Collection, limited time only for 2021. Dont miss out on this featured product. </span>
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
                <body className=".body" style={{ marginTop: '70px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d8208e01-ebc7-4a4e-8e46-4e14da3b67e7/air-max-90-mens-shoe-fxk1gm.png" />
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
                <body className=".body" style={{ marginTop: '100px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://photos6.spartoo.eu/photos/166/16612188/16612188_500_B.jpg" />
                        </div>
                        <div class="card__body__section">
                            <p>Reebok Black Flex Hoodie</p>
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
        </div >
    )
}

