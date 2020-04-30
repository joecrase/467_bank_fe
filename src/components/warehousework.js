import React, { useState, useEffect } from 'react';
import "./../CSS/warehousework.css"
import OrderTableRow from "./warehouseworkTools/OrderRow.js"
import axios from 'axios';

function WareWorkStation() {
  // Declare a new state variable, which we'll call "count"
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    console.log("You are in the useeffect")
    getAllOrders()
  }, []);

  function getAllOrders()
  {
    axios.get('http://localhost:8080/order/all')
    .then(function (response) {
      console.log(response)
      let temp = response.data.sort(function (key1, key2) {
        if (key1.datePurchased > key2.datePurchased) return -1;
        else if (key1 < key2) return +1;
        else return 0;
      })
      setAllOrders(temp.filter(entry => {
          return (entry.orderStatus !== "shipped");
      }))
  });
  }

  function sumItemTotal(item)
  {
    var total = 0
    for(var index = 0; index < item.length; index++)
    {
      total = total + item[index].amount
    }
    return total
  }

  function renderOrderRows()
  {
    console.log("Result")
    console.log(allOrders)
    return allOrders.map(function(item, i){
    return <OrderTableRow id={i} orderID={item.id} orderDate={item.datePurchased} distinctProducts={item.cart.length} totalProducts={sumItemTotal(item.cart)} orderStatus={item.orderStatus} cart={item.cart}/>
    })
  }

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
        {renderOrderRows()}
      </div>
    </div>
  );
}

export default WareWorkStation;