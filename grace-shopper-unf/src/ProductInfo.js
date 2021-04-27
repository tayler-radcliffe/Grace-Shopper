import React, { useState, useEffect } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { useParams } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import swal from "sweetalert";
import { fetchProductById, addItemsToCart, fetchCartData, fetchAverageReviews, addProductToWishList } from "./api/index";
import Rating from '@material-ui/lab/Rating';
import { fetchWishListByUserId } from './api/index';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
  },
}));

export default function ProductInfo({
  userId,
  hover,
  setHover,
  rating,
  setCart,
  setIndividualProductId,
  isLoggedIn,
  wishList,
  setWishList
}) {
  const [productSize, setProductSize] = useState("");
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [stars, setStars] = useState(0);

  const classes = useStyles();

  function sizeChecker(e) {
    e.preventDefault();
    if (productSize === '') {
      console.log("Not adding!")
      swal({
        title: "Shoe Size",
        text: "Please Select a Shoe Size!",
        icon: "error",
        button: false,
        timer: 2000,
      });
    } else if (!isLoggedIn) {

      swal({
        title: "Logged In?",
        text: "Please Log In Before Adding to Cart",
        icon: "error",
        button: false,
        timer: 2000,
      });
    } else {
      handleClick(e)
    }
  }



  async function handleClick(e) {

    e.preventDefault();
    await addItemsToCart(userId, product.id, productSize, 1);
    const newCartData = await fetchCartData(userId);
    setCart(newCartData);
    setIndividualProductId(product.id);
    swal({
      title: "Cart",
      text: "Added to Cart!",
      icon: "success",
      button: false,
      timer: 2000,
    });
  }

  useEffect(() => {
    try {
      fetchProductById(productId).then((individualProduct) => {
        console.log("full array or nah", individualProduct);
        setProduct(individualProduct);
        setRatings();
      });
    } catch (error) {
      throw error;
    }
  }, [productId]);

  const setRatings = async () => {
    const ratings = await fetchAverageReviews(productId);
    console.log(ratings);
    setStars(ratings.averageRating);

  }
  console.log(stars);

  async function addToWishlist(e) {
    e.preventDefault();
    console.log(userId, product.id, product.name, product.price);
    await addProductToWishList(userId, product.id, 0, product.name, product.price)
    const fetchedList = await fetchWishListByUserId(userId);
    console.log(fetchedList);
    setWishList(fetchedList);
    swal({
      title: "Wish List",
      text: "Product Added to Wishlist!",
      icon: "success",
      button: false,
      timer: 2000,
    });
  }

  return (
    <div className="overflow">
      <div
        title="Products"
        dark={false}
        id="section2"
        key={productId}
        className="wrapper"
      >
        <body>
          <div
            className="productInfoWrapper"
          >
            <div>
              <img
                className="productInfoImg"
                src={product.productImage}
                alt="products"
              />
            </div>
            <div>
              <div class="rating-section">
                <div class="stars-rating">
                  <Rating name="half-rating-read" defaultValue={stars} precision={0.5} readOnly />
                  <div style={{ fontSize: "20px" }}>{stars} out of 5 stars</div>
                </div>
                <div
                  stlye={{
                    marginTop: "10px",
                  }}
                  class="d-price"
                >
                  <span style={{ fontSize: '30px' }} className="productInfoPrice">${product.price}.00  <i onClick={addToWishlist} class="fas fa-heart"></i></span>
                </div>
              </div>
            </div>
          </div>
        </body>
        <div className="productTitleDescrip">
          <p
          >
            {product.name}
          </p>
          <span
            style={{
              fontSize: "30px",
              fontWeight: "500",
            }}
          >
          </span>
        </div>
        <div className="sizeGuide" > Select Size: {productSize}</div>
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
          {product.productStock >= 1 ? <div>
      <button onClick={sizeChecker} className="addToCartProduct">
        {" "}
        Add to Cart{" "}
        <i color="white" class="fas fa-cart-plus"></i>
      </button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Added to Cart!
        </Alert>
      </Snackbar>
      </div> 
      : 
      <div>
        <button className="addToCartProduct">
        {" "}
        Out Of Stock{" "}
        <i color="white" class="fas fa-cart-plus"></i>
      </button>
      </div>
      }
      <div className="productDescription">
        {product.description}{" "}
      </div>
    </div>
  );
}
