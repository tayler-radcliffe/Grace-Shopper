import React from 'react';
import "./Header.css";
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import swal from 'sweetalert';
import SwipeableTemporaryDrawer from './SwipableCart';


export default function Header({ products, username, setUsername, user, cart, setCart, userId, individualProductId, setIsLoggedIn, setUserId, userNameKey }) {

    console.log(username, typeof username);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory();


    return (
        <div className="header">
            <h1 className="header_title"> vivid </h1>
            <Link className='headerLinks' to="/">
                <div className="header_menu_item">
                    HOME
                </div>
            </Link>

            <Link className='headerLinks' to="/products">
                <div className="header_menu_item">
                    PRODUCTS
                </div>

            </Link>

            <Link className='headerLinks' to="/about">
                <div className="header_menu_item">
                    ABOUT
                </div>
            </Link>
            {username === 'VividAdmin' ? <Link className='headerLinks' to="/admin">
                <div className="header_menu_item">
                    ADMIN
                </div>
            </Link> : <div></div>}

            <div className="header_menu_item">
                <SwipeableTemporaryDrawer individualProductId={individualProductId} userId={userId} username={username} user={user} cart={cart} setCart={setCart} />
            </div>



            <div>{username ?
                (<div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon style={{ color: 'white' }} />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={(e) => {
                            handleClose();
                            history.push('/account')
                        }}>My Account</MenuItem>

                        <MenuItem onClick={(e) => {
                            handleClose();
                            setUsername('');
                            setCart([]);
                            localStorage.removeItem('token');
                            localStorage.removeItem('usernameKey')
                            localStorage.removeItem('userId')
                            localStorage.removeItem('loggedIn')
                            setIsLoggedIn(false);
                            setUsername('');
                            setUserId(0);
                            history.push('/');
                            swal({
                                title: 'Success',
                                text: 'You have been logged out!',
                                icon: 'success',
                                button: false,
                                timer: 2000
                            })
                        }}>Logout</MenuItem>
                    </Menu>
                </div>)
                :
                (<div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon style={{ color: 'white' }} />
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={(e) => {
                            handleClose();
                            history.push('/login')
                        }}>Login</MenuItem>

                        <MenuItem onClick={(e) => {
                            handleClose();
                            history.push('/register')
                        }}>Register</MenuItem>
                    </Menu>
                </div>)
            }
            </div>

        </div>
    )
}

