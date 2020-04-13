import React from 'react';
import './App.css';
import Parts from './pages/parts.js';
import Toolbar from './components/toolbar.js';
import Cart from './pages/cart.js';
import SignIn from './pages/login.js'
import Checkout from './pages/checkout/checkout.js';
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";


function App() {
  return (
    <Router>   
      <Toolbar />   
      <Switch>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/">
          <div className="App">
            <Parts />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
