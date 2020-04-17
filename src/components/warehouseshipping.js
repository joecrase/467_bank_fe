import React, { useState, useEffect } from 'react';
import "./../CSS/warehouseshipping.css"

function WareHouseShipping(props) {

  useEffect(() => {
    
  } , []);

  return (
    <div className="container">
        <div className="upperPortionPackaging">
        <div className="theBIGP">P </div>
        <div className="nextToPLabel">
            <div className="orderID">OrderID</div>
            <div className="dateProcessed">Date Processed</div>
        </div>
        </div>
    </div>
  );
}

export default WareHouseShipping;