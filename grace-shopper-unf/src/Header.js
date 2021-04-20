import React from 'react'
import "./Header.css";
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


export default function Header() {
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
            <Link to="/account">
                <div className="header_menu_item">
                    ACCOUNT
                </div>
            </Link>
            <Link to="/cart">
                <div className="header_menu_item">
                    <ShoppingCartIcon />
                </div>
            </Link>

        </div>
    )
}

