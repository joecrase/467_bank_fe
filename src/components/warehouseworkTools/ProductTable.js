import React, { useState, useEffect } from 'react';
import "./../../CSS/warehousework.css"
import ProductRow from "./ProductRow.js"
import { Link } from 'react-router-dom'

function ProductTable(props) {

    const [totalProductsFullfiled, setTotalProductsFullfiled] = useState(0);
    const [allProductsFullfiled, setAllProductsFullfiled] = useState(false);

    function updateOrderStatus(status)
    {
        //make a axios call here to change the order id's status
        console.log("You wish to change orderid " + props.orderID + " to " + status)
    }

    function checkIfAllProductFullfiled (conditional)
    {
        var goal = 3; // how we will find this is by taking the length of the array of compoenets when we
                      // store it into a state

        var currentTotal = null
        if(conditional == true)
        {
            currentTotal = totalProductsFullfiled + 1
            setTotalProductsFullfiled(currentTotal)
            console.log("You choose to fullil the order")
        }
        else if(conditional == false)
        {
            currentTotal = totalProductsFullfiled - 1
            setTotalProductsFullfiled(currentTotal)
            console.log("You choose to NOT fullil the order")
        }

        if(currentTotal == goal)
        {
            setAllProductsFullfiled(true)
            console.log("All products fullfiled!!!")
        }
        else
        {
            setAllProductsFullfiled(false)
            console.log("All NOT products fullfiled!!!")
            console.log(currentTotal)
        }
    }

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
                <ProductRow productID={"k5j43lk3"} prodName={"Cookies"} quantity={10} fillorder={props.fillorder} checkmarkProduct={checkIfAllProductFullfiled}/>
                <ProductRow productID={"fj4n345"} prodName={"Milk"} quantity={10} fillorder={props.fillorder} checkmarkProduct={checkIfAllProductFullfiled}/>
                <ProductRow productID={"hb3245b"} prodName={"Fudge"} quantity={7} fillorder={props.fillorder} checkmarkProduct={checkIfAllProductFullfiled}/>
            </div>
            <Link to={{
            pathname:"/warehousework/productfilling",
            state: {
                orderID: props.orderID
            }
            }}>
                <button onClick={() => updateOrderStatus("Filling")} className={"fillOrderButton " + (props.fillorder ? 'hidden' : '')}>Begin Filling</button>
            </Link>
            <Link to={{
            pathname:"/warehousework/shippingLabel",
            state: {
                orderID: props.orderID
            }
            }}>
                <button onClick={() => updateOrderStatus("Shipped")} disabled={!allProductsFullfiled} className={"fillOrderButton " + (props.fillorder ? '' : 'hidden') + (allProductsFullfiled ? 'green' : 'red')}>All Orders Fulfilled</button>
            </Link>
        </div>
    );
}

export default ProductTable;