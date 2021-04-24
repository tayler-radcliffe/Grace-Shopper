import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchProductById, addItemsToCart, fetchCartData } from "./api/index";

export default function ProductInfo({
  username,
  userId,
  hover,
  setHover,
  rating,
  setRating,
  cart,
  setCart,
}) {
  const [productSize, setProductSize] = useState("");
  const [product, setProduct] = useState({});
  const { productId } = useParams();

  async function handleClick(e) {
    e.preventDefault();
    await addItemsToCart(userId, product.id, productSize, 1);
    const newCartData = await fetchCartData(userId);
    setCart(newCartData);
  }

  useEffect(() => {
    try {
      fetchProductById(productId).then((individualProduct) => {
        console.log("full array or nah", individualProduct);
        setProduct(individualProduct);
      });
    } catch (error) {
      throw error;
    }
  }, [productId]);

  return (
    <div
      title="Products"
      dark={false}
      id="section2"
      key={productId}
      className="wrapper"
    >
      <body>
        <div
          style={{
            margin: "40px",
            marginLeft: "175px",
            width: "1000px",
            height: "800px",
            float: "left",
          }}
          class="card__container"
        >
          <div class="card__top__section">
            <img
              style={{
                width: "700px",
                height: "700px",
                marginBottom: "20px",
              }}
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a90cb62b-8083-4a6c-a556-54f1cc271766/wildhorse-7-mens-trail-running-shoe-rJ6R7V.png"
              alt="products"
            />
          </div>
          <div>
            <div class="rating-section">
              <div class="stars-rating">
                {[...Array(5)].map((star, idx) => {
                  const ratingValue = idx + 1;
                  return (
                    <label>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                      />
                      <FaStar
                        className="star"
                        size={15}
                        color={
                          ratingValue <= (hover || rating)
                            ? "#FFC107"
                            : "#E4E5E9"
                        }
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                      />
                    </label>
                  );
                })}
                <div style={{ fontSize: "20px" }}>{rating} out of 5 stars</div>
              </div>
              <div
                stlye={{
                  marginTop: "10px",
                }}
                class="d-price"
              >
                <span>${product.price}.00</span>
              </div>
            </div>
          </div>
        </div>
      </body>
      <div className="productTitleDescrip">
        <p
          style={{
            fontSize: "40px",
            fontWeight: "700",
          }}
        >
          {product.name}
        </p>
        <span
          style={{
            fontSize: "30px",
            fontWeight: "500",
          }}
        >
          {product.description}{" "}
        </span>
      </div>
      <div className="sizeGuide"> Select Size: </div>
      <div className="sizeBoard">
        <button onClick={(e) => setProductSize("5")} className="sizeBox">
          5
        </button>
        <button onClick={(e) => setProductSize("6")} className="sizeBox">
          6
        </button>
        <button onClick={(e) => setProductSize("7")} className="sizeBox">
          7
        </button>
        <button onClick={(e) => setProductSize("8")} className="sizeBox">
          8
        </button>
        <button onClick={(e) => setProductSize("9")} className="sizeBox">
          9
        </button>
        <button onClick={(e) => setProductSize("10")} className="sizeBox">
          10
        </button>
        <button onClick={(e) => setProductSize("11")} className="sizeBox">
          11
        </button>
        <button onClick={(e) => setProductSize("12")} className="sizeBox">
          12
        </button>
      </div>
      <button onClick={handleClick} className="addToCartProduct">
        {" "}
        Add to Cart{" "}
      </button>
      <div className="productDescription">
        {" "}
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  );
}
