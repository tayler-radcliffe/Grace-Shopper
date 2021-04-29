import React from 'react';
import Filter1Icon from '@material-ui/icons/Filter1';

export default function FeaturedProducts() {

    const imageSource1 = "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2017%2F04%2Fadidas-originals-2017-spring-summer-apparel-1.jpg?q=90&w=1400&cbr=1&fit=max"
    const imageSource2 = "https://images.pexels.com/photos/1102874/pexels-photo-1102874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    const imageSource3 = "https://images.unsplash.com/photo-1556906781-9a412961c28c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"

    return (
        <div className="homeWrapper">
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
                justifyContent: 'center',
                gridAutoFlow: 'row'

            }}>
                <body className=".body" style={{ marginTop: '100px' }}>
                    <div className="card__container">
                        <div className="card__top__section">
                            <img alt="images" src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/23a7f892-be4c-4aae-b4f7-dea0e9825bc4/react-miler-2-mens-running-shoe-3PDZdP.png" />
                        </div>
                        <div className="card__body__section">
                            <p>Nike React Miler 2</p>
                            <span>bringing back the cushioning and intuitive design of its predecessor. Its redesigned upper helps cut down on the bulk, offering support and a secure feel on long and short runs. </span>
                        </div>
                        <div>
                            <div className="c-price">
                                <span>$121.00</span>
                                <div style={{ padding: '5px 10px' }} className="featuredProducts-price-drop">
                                    May<span style={{ color: 'rgba(246, 184, 170, 1)' }} className="year-span">2021</span> Drop <Filter1Icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <body className=".body" style={{ marginTop: '150px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5,q_80/76d6176a-a829-4519-b7ba-e4d8d20b1481/wildhorse-7-mens-trail-running-shoe-rJ6R7V.png" />
                        </div>
                        <div class="card__body__section">
                            <p>Nike Wildhorse 7</p>
                            <span>Take on those tough and extreme trail runs with the rugged build of the Nike Wildhorse 7. The upper delivers durable ventilation with support where you need it. Foam midsole cushioning provides responsiveness on every mile. </span>
                        </div>
                        <div>
                            <div className="c-price">
                                <span>$130.00</span>
                                <div style={{ padding: '5px 10px' }} className="featuredProducts-price-drop">
                                    May<span style={{ color: 'rgba(246, 184, 170, 1)' }} className="year-span">2021</span> Drop <Filter1Icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <body className=".body" style={{ marginTop: '100px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/3902885a-3540-4db3-9f16-6ee9af19c6a9/flex-experience-run-9-mens-running-shoe-17FprH.png" />
                        </div>
                        <div class="card__body__section">
                            <p>Nike Flex Experience Run 9</p>
                            <span>The Nike Flex Experience Run 9 is built for natural motion. Secure support helps your foot stay in place, while a ventilated upper promotes airflow. Its versatile design delivers comfort no matter the run. </span>
                        </div>
                        <div>
                            <div className="c-price">
                                <span>$65.00</span>
                                <div style={{ padding: '5px 10px' }} className="featuredProducts-price-drop">
                                    May<span style={{ color: 'rgba(246, 184, 170, 1)' }} className="year-span">2021</span> Drop <Filter1Icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <body className=".body" style={{ marginTop: '100px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/dd84833696b84f489444acf500e40b57_9366/Kaptir_2.0_Shoes_White_H68090_01_standard.jpg" />
                        </div>
                        <div class="card__body__section">
                            <p>KAPTIR 2.0 SHOES</p>
                            <span>Running can be as much about comfort as it is about style. These adidas running-inspired shoes have a sculpted Cloudfoam midsole that provides pillow-soft comfort. A knit upper and a bold adidas logo complete the look. </span>
                        </div>
                        <div>
                            <div className="c-price">
                                <span>$85.00</span>
                                <div style={{ padding: '5px 10px' }} className="featuredProducts-price-drop">
                                    May<span style={{ color: 'rgba(246, 184, 170, 1)' }} className="year-span">2021</span> Drop <Filter1Icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <body className=".body" style={{ marginTop: '70px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/63776ec316254c638528ac9f010d47bb_9366/ZX_2K_Boost_Marvel_Shoes_Black_H02560_01_standard.jpg" />
                        </div>
                        <div class="card__body__section">
                            <p>ZX 2K BOOST MARVEL SHOES</p>
                            <span>The ZX Series has always been about technical innovation. Just like Stark Industries from Marvel's Iron Man series. These adidas shoes combine real-life retro running tech with details inspired by Tony Stark's fictional company.  </span>
                        </div>
                        <div>
                            <div className="c-price">
                                <span>$150.00</span>
                                <div style={{ padding: '5px 10px' }} className="featuredProducts-price-drop">
                                    May<span style={{ color: 'rgba(246, 184, 170, 1)' }} className="year-span">2021</span> Drop <Filter1Icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
                <body className=".body" style={{ marginTop: '100px', flex: '0 33%' }}>
                    <div class="card__container">
                        <div class="card__top__section">
                            <img alt="images" src="https://assets.adidas.com/images/h_840,f_auto,q_auto:sensitive,fl_lossy/df54dba4ab2f474b83edacd10139aaef_9366/Ultra_4D_5.0_Shoes_Grey_G58161_01_standard.jpg" />
                        </div>
                        <div class="card__body__section">
                            <p>ULTRA 4D 5.0 SHOES</p>
                            <span> For this version of the shoes, we retooled the design on a 3D-printed midsole. The denser parts of the lattice provide more support, and the parts that are open feel more cushioned. These shoes don't just look like the future. They feel like it, too. </span>
                        </div>
                        <div>
                            <div className="c-price">
                                <span>$200.00</span>
                                <div style={{ padding: '5px 10px' }} className="featuredProducts-price-drop">
                                    May<span style={{ color: 'rgba(246, 184, 170, 1)' }} className="year-span">2021</span> Drop <Filter1Icon />
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        </div >
    )
}

