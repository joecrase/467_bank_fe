import React, { useState, useEffect } from 'react';
import "./../../CSS/warehousework.css"
import ProductRow from "./ProductRow.js"

function ProductTable(props) {

    //const [showProductInfo, setShowProductInfo] = useState(false);

    return (
        <div className={"tableRow " + (props.show ? '' : 'hidden')}>
            <div className="newTable">
                <div className="tableRowTitles">
                    <div className="tableCell">
                        ProductID
                    </div>
                    <div className="tableCell">
                        Product Name
                    </div>
                    <div className="tableCell">
                        Quantity
                    </div>
                </div>
                <ProductRow productID={"k5j43lk3"} prodName={"Cookies"} quantity={10}/>
                <ProductRow productID={"fj4n345"} prodName={"Milk"} quantity={10}/>
                <ProductRow productID={"hb3245b"} prodName={"Fudge"} quantity={7}/>
            </div>
        </div>
    );
}

export default ProductTable;