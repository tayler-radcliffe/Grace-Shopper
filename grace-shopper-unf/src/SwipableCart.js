import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddIcon from '@material-ui/icons/Add';
import Badge from "@material-ui/core/Badge";
import "./Cart.css";
import { Link } from "react-router-dom";
import { deleteProductFromCart, fetchCartData, quantityUpdate, fetchProductById } from "./api";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: { main: green[400] }
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    list: {
      width: 300,
    },
    fullList: {
      width: "auto",
    },
  },
}));

export default function SwipeableTemporaryDrawer({
  username,
  cart,
  setCart,
  userId,
  individualProductId,
}) {

  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  console.log("PPP", userId);

  const handleRemove = async (event, productId) => {
    event.preventDefault();
    console.log(productId);
    await deleteProductFromCart(userId, productId);
    const newCart = await fetchCartData(userId);
    setCart(newCart);
  };

  const increaseQty = async (event, productId, quantity) => {
    event.preventDefault();
    const newQty = quantity + 1;
    await quantityUpdate(newQty, productId, userId)
    const newCart = await fetchCartData(userId);
    setCart(newCart);
  };

  const decreaseQty = async (event, productId, quantity) => {
    event.preventDefault();
    const newQty = quantity - 1;
    if (newQty < 1) {
      await deleteProductFromCart(userId, productId);
      const newCart = await fetchCartData(userId);

      setCart(newCart);
    } else {
      await quantityUpdate(newQty, productId, userId)
      const newCart = await fetchCartData(userId);
      setCart(newCart);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        width: "350px",
        flexDirection: "column",
      }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={{ marginTop: "20px" }}>Your Cart</h2>
      <br></br>
      <Divider />

      <List>
        <div>
          {cart[0] ? (
            cart.map((product) => {
              console.log(product)
              return (
                <div key={product.productsId}>
                  <h2>{product.productName}</h2>
                  <p>Price: $ {product.productPrice}</p>

                  <p>Size: {product.size}</p>
                  <p style={{ display: "flex", lineHeight: '30px' }}>
                    Quantity: {product.quantity}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Button
                        variant="contained"
                        onClick={(event) =>
                          increaseQty(
                            event,
                            product.productsId,
                            product.quantity
                          )
                        }
                        style={{ padding: '2px', marginLeft: "10px" }}
                      >
                        <i class="fas fa-plus"></i>
                      </Button>
                      <Button
                        variant="contained"
                        onClick={(event) =>
                          decreaseQty(
                            event,
                            product.productsId,
                            product.quantity
                          )
                        }
                        style={{
                          marginTop: "2px",
                          marginLeft: "10px",
                          padding: '2px'
                        }}
                      >
                        <i class="fas fa-minus"></i>
                      </Button>
                    </div>
                  </p>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(event) => handleRemove(event, product.productsId)}
                    style={{ marginTop: "2px", marginLeft: '5px', padding: "5px", }}
                  >
                    <i class="fas fa-trash"></i>
                  </Button>
                </div>
              );
            })
          ) : (
            <p style={{ marginTop: "20px" }}>You have no items in your cart!</p>
          )}
        </div>
      </List>
      <Link
        to="/checkout"
        style={{
          padding: '20px',
          textDecoration: "none",
        }}
      >
        <span style={{ position: 'absolute', top: '10px', right: '20px', color: 'black', fontSize: '15px' }}>
          <i class='<i fas fa-money-check-alt faa-horizontal animated fa-4x'></i>
        </span>
      </Link>
    </div >
  );

  return (
    <div className="cart-icon">
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon onClick={toggleDrawer(anchor, true)}>
              {anchor}
            </ShoppingCartIcon>
          </Badge>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
