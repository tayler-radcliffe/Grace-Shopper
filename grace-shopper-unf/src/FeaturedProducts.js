import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

export default function FeaturedProducts() {

    const imageSource1 = "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F04%2Fadidas-originals-2017-spring-summer-apparel-1.jpg?q=90&w=1400&cbr=1&fit=max"
    const imageSource2 = "https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    const imageSource3 = "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    return (
        <div>
            <body>
                <div class="box">
                    <div class="card">
                        <div class="imgBx">
                            <img src={imageSource1} alt="images" />
                        </div>
                        <div class="details">
                            <h2>Adidas Collection<br /><span>Originals</span></h2>
                        </div>
                    </div>

                    <div class="card">
                        <div class="imgBx">
                            <img src={imageSource3} alt="images" />
                        </div>
                        <div class="details">
                            <h2>Nike Collection<br /><span>Killshot 2's</span></h2>
                        </div>
                    </div>

                    <div class="card">
                        <div class="imgBx">
                            <img src={imageSource2} alt="images" />
                        </div>
                        <div class="details">
                            <h2>Adidas Collection<br /><span>Prime V</span></h2>
                        </div>
                    </div>

                </div>
            </body>
            <div className="featuredProductsText" style={{ fontSize: '30px', position: 'relative', top: '60px' }}>
                Featured Products
        </div>
            <body className=".body" style={{ marginTop: '100px' }}>
                <div class="card__container">
                    <div class="card__top__section">
                        <img src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" />
                    </div>
                    <div class="card__body__section">
                        <p>Nike Epic React Flyknit</p>
                        <span>The Nike Epic React Flyknit foam cushioning is responsive yet light-weight, durable yet soft. </span>
                    </div>
                    <div>
                        <div class="rating-section">
                            <div class="stars-rating">
                                <i class="fas fa-star rating-with-color"></i>
                                <i class="fas fa-star rating-with-color"></i>
                                <i class="fas fa-star rating-with-color"></i>
                                <i class="fas fa-star-half-alt rating-with-color"></i>
                                <i class="far fa-star rating-with-color"></i>
                                <span>3.6 out of 5</span>
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

