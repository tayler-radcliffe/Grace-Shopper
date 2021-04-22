import React from 'react';
import "./Header.css";
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import swal from 'sweetalert';
import SwipeableTemporaryDrawer from './SwipableCart';


export default function Header({ username, setUsername }) {


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
            <h1 className="header_title"> Logo/Company Name</h1>
            <Link to="/">
                <div className="header_menu_item">
                    HOME
                </div>
            </Link>

            <Link to="/products">
                <div className="header_menu_item">
                    PRODUCTS
                </div>

            </Link>

            <Link to="/about">
                <div className="header_menu_item">
                    ABOUT
                </div>
            </Link>
            
            <div className="header_menu_item">
                    <SwipeableTemporaryDrawer />
            </div>

           

            <div>{username ?
                (<div>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <MenuIcon style={{ color: 'white'}} />
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
                            localStorage.removeItem('token');
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
                        <MenuIcon style={{ color: 'white'}}/>
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

