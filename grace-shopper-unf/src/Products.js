import React from 'react';
import Product from "./Product";

export default function Products({ products, setProducts, searchTerm, setSearchTerm, rating, setRating, hover, setHover }) {


    // const productMatches = (product, text) => {
    //     const lowerCaseText = text.toLowerCase();
    //     const linkUrl = link.url.toLowerCase();
    //     const linkTag = link.tags
    //     const mappedTags = linkTag.map(link => link.name.toLowerCase());
    //     const mappedTagsToString = mappedTags.toString();
    //     if (
    //         linkUrl.includes(lowerCaseText) ||
    //         mappedTagsToString.includes(lowerCaseText)
    //     ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    // const filteredProducts = products.filter((product) => productMatches(product, searchTerm));
    // const productsToDisplay = searchTerm.length ? filteredProducts : products;


    return (
        <div>
            <div className="productsHeader" style={{ position: 'fixed', left: '200px', top: '150px', fontSize: '30px', fontWeight: 'bolder' }}>
                All Products
            </div>
            {/* {productsToDisplay.map(link => <Product product={product} setProducts={setProducts} productId={product.id} setSearchTerm={setSearchTerm}
                rating={rating} setRating={setRating} hover={hover} setHover={setHover} />)} */}

        </div>
    )
}