import React from 'react';
import Product from "./Product";
import CarouselComponent from './Carousel';
import { Link } from "react-scroll";
import "./Product.css";

export default function Products({ products, setProducts, searchTerm, setSearchTerm, rating, setRating, hover, setHover, id }) {

    console.log(products);

    const productMatches = (product, text) => {

        const lowerCaseText = text.toLowerCase();
        const productName = product.name.toLowerCase();
        const productDescription = product.description.toLowerCase();
        //const productPrice = product.price;
        //const mappedReviews = products.map(product => product.reviews);
        if (
            productName.includes(lowerCaseText) ||
            productDescription.includes(lowerCaseText)
        ) {
            return true;
        } else {
            return false;
        }
    };

    console.log(searchTerm.length);

    const filteredProducts = products.filter((product) => productMatches(product, searchTerm));
    const productsToDisplay = searchTerm.length ? filteredProducts : products;


    return (
        <div>
            <div className="section-content" id={id}>
                <Link
                    to="section2"
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={600}
                >
                    <button className="productsExploreButton">
                        Explore
                  </button>

                </Link>
            </div>
            <div style={{ borderBottom: '6px solid black', borderTop: '6px solid black' }}>
                <CarouselComponent />
            </div>
            <div className="productsHeader" style={{
                float: 'center',
                fontSize: '30px',
                fontWeight: 'bolder',
                marginTop: '50px',
                textAlign: 'center'

            }}>
                All Products
            </div>
            <form
                className="productsSearch"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} action=""
                style={{
                    marginTop: '30px'
                }}>
                <input className="productsInput" type="search" />
                <i class="fa fa-search"></i>
            </form>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 500px))',
                justifyContent: 'center',
                marginTop: '20px'

            }}
            >
                {productsToDisplay.map(product => <Product
                    product={product} setProducts={setProducts} productId={product.id} setSearchTerm={setSearchTerm}
                    rating={rating} setRating={setRating} hover={hover} setHover={setHover} />)}
            </div>
        </div>
    )
}