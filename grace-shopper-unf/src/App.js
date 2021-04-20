import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import Products from "./Products";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";
import Login from "./Login";
import Register from "./Register";
import Account from './Account';

function App() {

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');


  return (
    <div className="App">
      <Router>
        <Header username={username} setUsername={setUsername}/>
        <Route exact path='/'>
          <Home />
          < FeaturedProducts rating={rating} setRating={setRating} hover={hover} setHover={setHover} />
          < Footer />
        </Route>

        <Route exact path='/products'>
          <Products products={products}
            setProducts={setProducts}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            rating={rating}
            setRating={setRating}
            hover={hover}
            setHover={setHover} />
        </Route>

        <Route exact path='/about'>
        </Route>

        <Route exact path='/contact'>
        </Route>

        <Route exact path='/account'>
          <Account username={username}/>
        </Route>

        <Route exact path='/login'>
         <Login username={username} setUsername={setUsername}/>
        </Route>

        <Route exact path='/register'>
         <Register username={username} setUsername={setUsername}/>
        </Route>

      </Router>
    </div>
  );
}

export default App;
