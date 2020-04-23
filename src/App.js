import React, {Component}  from 'react';
import './App.css';
import SignIn from './pages/login.js'
import Checkout from './pages/checkout/checkout.js';
import UserPage from './pages/userpage.js'
import {
  BrowserRouter as Router,
  Switch,
  Route, 
} from "react-router-dom";

export default class App extends Component {
  render() {
  return (
    <Router>   
      <Switch>
        <Route path="/userPage">
          <UserPage/>
        </Route>
        <Route path="/login">
          <SignIn />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
      </Switch>
    </Router>
  );
  }
}
