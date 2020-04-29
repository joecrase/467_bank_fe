import React, { useState, useEffect } from 'react';
import ProductTable from './warehouseworkTools/ProductTable.js'
import "./../CSS/warehousefilllist.css"
import "./../CSS/warehousework.css"

function WareHouseFillList(props) {
  // Declare a new state variable, which we'll call "count"
  //const ProductInfoTable = useRef(null);

  useEffect(() => {
    // Update the document title using the browser API
    console.log(props.location.state.orderID + " is the orderID that we intend to search here once the route is up")
  } , []);

  return (
    <div>
      <div>
        <div className="workerTitle">Calf Co Warehouse Interface</div>
        <div className="orderIDTitleCard">Order ID {props.location.state.orderID} Product List</div>
        <ProductTable show={true} fillorder={true} orderID={props.location.state.orderID} cart={props.cart || props.location.state.cart}/>
      </div>
    </div>
  );
}

export default WareHouseFillList;