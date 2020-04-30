import React, { useState, useEffect } from 'react';
import "./../../CSS/warehousework.css"

function ProductRow(props) {
  // Declare a new state variable, which we'll call "count"
  const [productFound, setProductFound] = useState(false);

    function fulfillProduct()
    {
        console.log("You clicked the button")
        var tempProductFound = !productFound;
        setProductFound(tempProductFound)
        props.checkmarkProduct(tempProductFound)
    }

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
            <div className={"tableCell " + (props.fillorder ? '' : 'hidden')}>
                <button className={"fillProductButton " + (productFound ? "green" : "red")} onClick={() => fulfillProduct()}> Order Fulfilled</button>
            </div>
        </div>
    );
}

export default ProductRow;