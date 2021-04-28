import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import { fetchProductById, addItemsToCart, fetchCartData, fetchAverageReviews, addProductToWishList } from "./api/index";
import Rating from '@material-ui/lab/Rating';
import { fetchWishListByUserId } from './api/index';
import { makeStyles } from '@material-ui/core/styles';
import ReviewsModal from './ReviewsModal';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
  const [isWishList, setIsWishList] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  console.log(wishList);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
    </div>
  );

  function rand() {
    return Math.round(Math.random() * 20) - 10;
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
      Promise.all([fetchProductById(productId)]).then(([data]) => {
        setProduct(data);
        setRatings();
        const wishListCheck = wishList.map(item => item.productsId);
        console.log("BBB", wishListCheck);
        console.log("WWW", productId)
        for (let i = 0; i < wishListCheck.length; i++) {
          if (wishListCheck[i] == productId) {
            setIsWishList(true);
          }
        }
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
  console.log("hello", stars);

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

  const logInChecker = (event) => {
    if (isLoggedIn) {
      addToWishlist(event);
      setIsWishList(true);
    } else {
      swal({
        title: "Wish List",
        text: "Please login to add items to a wishlist!",
        icon: "error",
        button: false,
        timer: 2000,
      });
    }
  }

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
              <div class="stars-rating" style={{ fontFamily: "Rubik" }}>
                {stars ? <div><Rating name="half-rating-read" value={stars} precision={0.5} readOnly />
                  <div style={{ fontSize: "20px" }}>{stars} out of 5 stars</div></div> : <div style={{ padding: '10px' }}>No reviews yet</div>
                }
              </div>
              < ReviewsModal product={product} />
              <div
                stlye={{
                  marginTop: "10px",
                }}
                class="d-price"
              >
                {isWishList ? <span style={{ fontSize: '30px' }} className="productInfoPrice"> ${product.price}.00 <i class="fas fa-heart"></i> </span> : <span style={{ fontSize: '30px' }} className="productInfoPrice">${product.price}.00  <i onClick={(event) => logInChecker(event)} class="far fa-heart"></i></span>}
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
      <div className="sizeGuide" > Select Size: <strong>{productSize}</strong></div>
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
      </div>
        :
        <div>
          <button style={{ backgroundColor: '#B0B0B0', border: '2px solid black' }} className="addToCartProduct">
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
