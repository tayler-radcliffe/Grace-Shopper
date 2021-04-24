import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import About from "./About";
import ProductInfo from "./ProductInfo";
import Scroll from "./Scroll";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import { fetchProducts, fetchCartData, fetchUserData } from "./api/index";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import Checkout from "./Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(0);
  const [user, setUser] = useState([]);

  useEffect(() => {
    try {
      Promise.all([fetchProducts()]).then(([data]) => {
        setProducts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header
          username={username}
          setUsername={setUsername}
          cart={cart}
          setCart={setCart}
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
          <Checkout userId={userId} cart={cart} setCart={setCart} />
        </Route>

        <Route exact path="/account">
          <Account username={username} setUsername={setUsername} />
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
          />
        </Route>

        <Route exact path="/products/:productId">
          <ProductInfo
            hover={hover}
            setHover={setHover}
            rating={rating}
            setRating={setRating}
            username={username}
            userId={userId}
            cart={cart}
            setCart={setCart}
          />
          <Footer />
        </Route>
      </Router>
    </div>
  );
}

export default App;
