import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import About from "./About";
import Scroll from "./Scroll";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import { fetchProducts } from "./api/index";
import Login from "./Login";
import Register from "./Register";
import Account from "./Account";
import Checkout from './Checkout';

function App() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    try {
      Promise.all([fetchProducts()]).then(([data]) => {
        console.log(data);
        setProducts(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header username={username} setUsername={setUsername} />
        <Route exact path="/">
          <Home />
          <FeaturedProducts
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover}
          />
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
        </Route>

        <Route exact path="/about">
          <About />
        </Route>

        <Route exact path="/checkout">
          <Checkout />
        </Route>

        <Route exact path="/account">
          <Account username={username} setUsername={setUsername}/>
        </Route>

        <Route exact path="/login">
          <Login username={username} setUsername={setUsername} />
        </Route>

        <Route exact path="/register">
          <Register username={username} setUsername={setUsername} />
        </Route>

        <Footer />
        
        <Scroll showBelow={250} />
      </Router>
    </div>
  );
}

export default App;
