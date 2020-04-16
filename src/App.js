import React from 'react';
import './App.css';
import Parts from './pages/parts.js';
import Toolbar from './components/toolbar.js';
import Cart from './pages/cart.js';
import SignIn from './pages/login.js'
import Checkout from './pages/checkout/checkout.js';
import WareWorkStation from './components/warehousework.js'
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";


function App() {
  return (
    <Router>   
      {//<Toolbar />//this will have to be moved for certain compnents. I dont think it 
                    //is great to have this up for all interfaces ex a warehouse interface wont have the store
                  }
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
        <Route path="/warehousework">
          <WareWorkStation />
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
