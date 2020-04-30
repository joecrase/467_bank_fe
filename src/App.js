import React, { Component } from 'react';
import './App.css';
import SignIn from './pages/login.js';
import Checkout from './pages/checkout/checkout.js';
import UserPage from './pages/userpage.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Parts from './pages/parts.js';
import Toolbar from './components/toolbar.js';
import Cart from './pages/cart.js';
import Recieve from './pages/recieving/recieve.js';
import WareWorkStation from './pages/warehouse/warehousework.js';
import WareHouseFillList from './components/warehouseFillList.js';
import WareHouseShipping from './components/warehouseshipping.js';
import AdminView from './pages/admin/adminView.js';

function App() {
    return (
        <Router>
            {
                //<Toolbar />//this will have to be moved for certain compnents. I dont think it
                //is great to have this up for all interfaces ex a warehouse interface wont have the store
            }
            <Switch>
                <Route path='/userPage'>
                    <UserPage />
                </Route>
                <Route path='/recieve'>
                    <Recieve />
                </Route>
                <Route path='/login'>
                    <SignIn />
                </Route>
                <Route path='/checkout' component={Checkout}></Route>
                <Route path='/cart'>
                    <Cart />
                </Route>
                <Route path='/login'>
                    <SignIn />
                </Route>
                <Route path='/checkout'>
                    <Checkout />
                </Route>
                <Route
                    path='/warehousework/productfilling'
                    component={WareHouseFillList}
                />
                <Route
                    path='/warehousework/shippingLabel'
                    component={WareHouseShipping}
                />
                <Route path='/warehousework'>
                    <WareWorkStation />
                </Route>
                <Route path='/admin'>
                    <AdminView />
                </Route>
                <Route path='/'>
                    <div className='App'>{/* <SignIn/> */}</div>
                </Route>
            </Switch>
        </Router>
    );
}
export default App;
