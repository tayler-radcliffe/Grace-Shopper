import React, { useState, useEffect } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import swal from "sweetalert";
import { fetchProductById, addItemsToCart, fetchCartData, fetchAverageReviews } from "./api/index";
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
  isLoggedIn
}) {
  const [productSize, setProductSize] = useState("");
  const [product, setProduct] = useState({});
  const [open, setOpen] = React.useState(false);
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
    setOpen(true);
    setIndividualProductId(product.id);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
                marginLeft: '130px'
              }}
              src="https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a90cb62b-8083-4a6c-a556-54f1cc271766/wildhorse-7-mens-trail-running-shoe-rJ6R7V.png"
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
      <div className="sizeGuide"> Select Size: {productSize}</div>
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

      <button onClick={sizeChecker} className="addToCartProduct">
        {" "}
        Add to Cart{" "}
      </button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Added to Cart!
        </Alert>
      </Snackbar>
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
