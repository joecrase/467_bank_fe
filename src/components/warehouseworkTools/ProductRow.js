import React, { useState, useEffect } from 'react';
import "./../../CSS/warehousework.css"

function ProductRow(props) {
  // Declare a new state variable, which we'll call "count"
  const [showProductInfo, setShowProductInfo] = useState(false);
    

    return (
        <div className="tableRow">
            <div className="tableCell">
                {props.productID}
            </div>
            <div className="tableCell">
                {props.prodName}
            </div>
            <div className="tableCell">
                {props.quantity}
            </div>
        </div>
    );
}

export default ProductRow;