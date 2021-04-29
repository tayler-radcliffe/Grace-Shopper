import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Cart.css';
import { Link } from 'react-router-dom';
import { fetchCartData } from './api';

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

export default function SwipeableTemporaryDrawer({username, user, cart, setCart}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  useEffect(() => {
    Promise.all([fetchCartData(user.id)]).then(([data]) => {
      setCart(data);
    });
  }, []); 

  console.log(cart);


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 style={{marginTop: '20px'}}>Your Cart</h2><br></br>
      <Divider />
      <p style={{marginTop: '20px'}}>You have no items in your cart!</p>
      <List>
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
      <Link to='/checkout'  style={{position: 'absolute', bottom: '0', marginBottom: '50px', marginRight: '20px', textDecoration: 'none'}}>
          <Button
        variant='contained'>Checkout</Button>
        </Link>
    </div>
  );

  return (
    <div className='cart-icon'>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <ShoppingCartIcon onClick={toggleDrawer(anchor, true)}>{anchor}</ShoppingCartIcon>
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