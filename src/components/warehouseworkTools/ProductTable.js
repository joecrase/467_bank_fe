import React, { useState, useEffect } from 'react';
import "./../../CSS/warehousework.css"
import ProductRow from "./ProductRow.js"
import { Link } from 'react-router-dom'
import axios from 'axios';

function ProductTable(props) {

    const [totalProductsFullfiled, setTotalProductsFullfiled] = useState(0);
    const [allProductsFullfiled, setAllProductsFullfiled] = useState(false);

    function updateOrderStatus(status)
    {
        //TODO make a axios call here to change the order id's status
        console.log("You wish to change orderid " + props.orderID + " to " + status)
        // /updateStatus/{orderId}/{orderStatus}

        axios.post('http://localhost:8080/order/updateStatus/' + props.orderID + '/' + status)
            .then(function (response) {
            });

    }

    function checkIfAllProductFullfiled (conditional)
    {
        var goal = props.cart.length;

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

    function renderProductRows() {
        console.log("Here is the cart")
        console.log(props.cart)
        return props.cart.map(function(item, i){ //TODO Ask Josph to put product name with the response with the order
            return <ProductRow productID={item.partId} prodName={"Cookies"} quantity={item.amount} fillorder={props.fillorder} checkmarkProduct={checkIfAllProductFullfiled}/>
        })
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
                {renderProductRows()}
            </div>
            <Link to={{
            pathname:"/warehousework/productfilling",
            state: {
                orderID: props.orderID, 
                cart: props.cart
            }
            }}>
                <button onClick={() => updateOrderStatus("Filling")} className={"fillOrderButton " + (props.fillorder ? 'hidden' : '')}>Begin Filling</button> {/* TODO 1. fix buttons so they dont extend so much. 2. add another button that will direct to shipping label if authorized */}
            </Link>
            <Link to={{
            pathname:"/warehousework/shippingLabel",
            state: {
                orderID: props.orderID
            }
            }}>
                <button onClick={() => updateOrderStatus("Shipped")} disabled={!allProductsFullfiled} className={"fillOrderButton " + (props.fillorder ? '' : 'hidden ') + (allProductsFullfiled ? 'green' : 'red')}>All Orders Fulfilled</button>
            </Link>
        </div>
    );
}

export default ProductTable;