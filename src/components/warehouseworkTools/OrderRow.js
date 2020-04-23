import React, { useState, useEffect } from 'react';
import "./../../CSS/warehousework.css"
import ProductTable from "./ProductTable.js"

function OrderTableRow(props) {

    const [viewOrderClicked, setViewOrderClicked] = useState(false);

    function viewOrder()
    {
      console.log("Setting the order table due to ti being " + !viewOrderClicked)
      setViewOrderClicked(!viewOrderClicked)
    }

    return (
      <div className="tableRowGroup">
        <div className="tableRow">
          <div className="tableCell specialCaseCell">
            {props.orderID}
          </div>
          <div className="tableCell">
            {props.orderDate}
          </div>
          <div className="tableCell">
            {props.distinctProducts}
          </div>
          <div className="tableCell">
            {props.totalProducts}
          </div>
          <div className="tableCell">
            {props.orderStatus}
          </div>
          <div className="faketableCell">
            <button onClick={() => viewOrder()} className="viewOrderBut">View Order</button>
          </div>
        </div>
        <ProductTable orderID={props.orderID} show={viewOrderClicked} fillorder={false} cart={props.cart}/>
      </div>
    );
}

export default OrderTableRow;