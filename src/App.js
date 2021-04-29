import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import About from "./About";
import Admin from "./Admin"
import ProductInfo from "./ProductInfo";
import Scroll from "./Scroll";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import {
  fetchProducts,
  fetchCartData,
  fetchPurchaseHistory,
} from "./api/index";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import Checkout from "./Checkout";

function App() {
  const loggedInKey = localStorage.getItem("loggedIn");
  const userNameKey = localStorage.getItem("usernameKey");
  const userIdKey = localStorage.getItem("userId");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [username, setUsername] = useState(userNameKey ? userNameKey : "");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(userIdKey ? userIdKey : 0);
  const [user, setUser] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [individualProductId, setIndividualProductId] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [openAdmin, setOpenAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    loggedInKey ? loggedInKey : false
  );

  useEffect(() => {
    try {
      Promise.all([fetchProducts()]).then(([data]) => {
        setProducts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (userIdKey) {
        Promise.all([fetchCartData(userIdKey)]).then(([data]) => {
          setCart(data);
          console.log(data);
        });
      }

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      if (userIdKey) {
        Promise.all([fetchPurchaseHistory(userIdKey)]).then(([data]) => {
          setPurchaseHistory(data);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUser = async () => {
    await fetch(`http://localhost:3000/api/users/${username}/personal`, {})
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUser(result);
      })
      .catch(console.error);
  };

  useEffect(() => {
    Promise.all([getUser]).then(([data]) => {
      setUser(data);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Header
          products={products}
          username={username}
          setUsername={setUsername}
          user={user}
          cart={cart}
          setCart={setCart}
          userId={userId}
          setUserId={setUserId}
          individualProductId={individualProductId}
          setIsLoggedIn={setIsLoggedIn}
          userNameKey={userNameKey}
          openAdmin={openAdmin}
          setOpenAdmin={setOpenAdmin}
        />
        <Route exact path="/">
          <Home />
          <FeaturedProducts
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
          />
          <Footer />
          <Scroll showBelow={250} />
        </Route>

        <Route exact path="/products">
          <Products
            products={products}
            setProducts={setProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
          />
          <Footer />
          <Scroll showBelow={250} />
        </Route>

        <Route exact path="/about">
          <About />
          <Scroll showBelow={250} />
        </Route>

        <Route exact path="/checkout">
          <Checkout
            setProducts={setProducts}
            user={user}
            cart={cart}
            setCart={setCart}
            userId={userId}
            purchaseHistory={purchaseHistory}
            setPurchaseHistory={setPurchaseHistory}
          />
        </Route>

        <Route exact path="/admin">
          <Admin products={products} setProducts={setProducts} />
        </Route>

        <Route exact path="/account">
          <Account
            wishList={wishList}
            setWishList={setWishList}
            username={username}
            setUsername={setUsername}
            purchaseHistory={purchaseHistory}
            setPurchaseHistory={setPurchaseHistory}
            setProducts={setProducts}
          />
          <Footer />
          <Scroll showBelow={250} />
        </Route>

        <Route exact path="/login">
          <Login
            username={username}
            setUsername={setUsername}
            cart={cart}
            setCart={setCart}
            userId={userId}
            setUserId={setUserId}
            password={password}
            setPassword={setPassword}
            user={user}
            setUser={setUser}
            setPurchaseHistory={setPurchaseHistory}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            openAdmin={openAdmin}
            setOpenAdmin={setOpenAdmin}
          />
        </Route>

        <Route exact path="/register">
          <Register
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            userId={userId}
            setUserId={setUserId}
            cart={cart}
            setCart={setCart}
            setUser={setUser}
            setPurchaseHistory={setPurchaseHistory}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        </Route>

        <Route exact path="/products/:productId">
          <ProductInfo
            wishList={wishList}
            setWishList={setWishList}
            username={username}
            hover={hover}
            setHover={setHover}
            rating={rating}
            setRating={setRating}
            username={username}
            userId={userId}
            cart={cart}
            setCart={setCart}
            setIndividualProductId={setIndividualProductId}
            isLoggedIn={isLoggedIn}
          />
          <Footer />
        </Route>
      </Router>
    </div>
  );
}

export default App;
