import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./Header";
import Home from "./Home";
import FeaturedProducts from "./FeaturedProducts";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Route exact path='/'>
          <Home />
          < FeaturedProducts />
          < Footer />
        </Route>

        <Route exact path='/products'>
        </Route>

        <Route exact path='/about'>
        </Route>

        <Route exact path='/contact'>
        </Route>

        <Route exact path='/account'>
        </Route>
      </Router>
    </div>
  );
}

export default App;
