import React, { useState, useEffect } from 'react';
import "./../CSS/warehousework.css"
import OrderTableRow from "./warehouseworkTools/OrderRow.js"

function WareWorkStation() {
  // Declare a new state variable, which we'll call "count"
  //const ProductInfoTable = useRef(null);

  return (
    <div>
      <div className="workerTitle">Calf Co Warehouse Interface</div>
      <div className="workerTable">
        <div className="tableRowTitles">
          <div className="tableCell">
            OrderID
          </div>
          <div className="tableCell">
            Order Date
          </div>
          <div className="tableCell">
            Num of Distinct Products
          </div>
          <div className="tableCell">
            Quantity of Products
          </div>
          <div className="tableCell">
            Order Status
          </div>
        </div>
        <OrderTableRow id={1} orderID={"hj43kj435kjbl453"} orderDate={"3/27/1998"} distinctProducts={3}
        totalProducts={27} orderStatus={"Open"}/>
        <OrderTableRow id={2} orderID={"4j5hj23h63hj56g"} orderDate={"4/11/2019"} distinctProducts={2}
        totalProducts={14} orderStatus={"Open"}/>
        <OrderTableRow id={2} orderID={"4j5hj23h63hj56g"} orderDate={"4/11/2019"} distinctProducts={2}
        totalProducts={14} orderStatus={"Open"}/>
      </div>
    </div>
  );
}

export default WareWorkStation;