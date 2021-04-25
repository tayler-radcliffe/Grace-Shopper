import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import './Cart.css';
import { Link } from 'react-router-dom';
import { deleteProductFromCart, fetchCartData } from './api';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    list: {
      width: 300,
    },
    fullList: {
      width: 'auto',
    },
  },
}));

export default function SwipeableTemporaryDrawer({ username, cart, setCart, userId, individualProductId }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  console.log("PPP", userId)

  const handleRemove = async (event, productId) => {
    event.preventDefault();
    console.log(productId);
    await deleteProductFromCart(userId, productId);
    const newCart = await fetchCartData(userId);
    setCart(newCart);
  }





  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div style={{ display: 'flex', alignItems: 'center', padding: '10px', width: '350px', flexDirection: 'column' }}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={{ marginTop: '20px' }}>Your Cart</h2><br></br>
      <Divider />

      <List>
        <div>
          {cart[0] ? cart.map(product => {
            return (
              <div key={product.productsId}>
                <h2>
                  Name: {product.productName}
                </h2>
                <p>
                  Price: $ {product.productPrice}
                </p>
                <p>
                  Size: {product.size}
                </p>
                <p>
                  Quantity: {product.quantity}
                </p>
                <Button variant='contained' onClick={(event) => handleRemove(event, product.productsId)} style={{ marginTop: '5px', padding: '5px' }} >Remove Item</Button>

              </div>
            )
          }) : <p style={{ marginTop: '20px' }}>You have no items in your cart!</p>}
        </div>
      </List>
      <Link to='/checkout' style={{ position: 'absolute', bottom: '0', marginBottom: '50px', marginRight: '20px', textDecoration: 'none' }}>
        <Button
          variant='contained'>Checkout</Button>
      </Link>
    </div>
  );

  return (
    <div className='cart-icon'>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Badge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon onClick={toggleDrawer(anchor, true)}>{anchor}</ShoppingCartIcon>
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