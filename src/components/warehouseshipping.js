import React, { useState, useEffect } from 'react';
import barcode from "./../themPics/blog-make-shipping-easier-by-making-labels-easier-blog-preview.jpg"
import "./../CSS/warehouseshipping.css"
import axios from 'axios';

function WareHouseShipping(props) {
  const [orderInfo, setOrderInfo] = useState()
  const [orderRender, setOrderRender] = useState(false)

  useEffect(() => {
    callOrderIDInfo()
  } , []);

  function callOrderIDInfo()
  {
    //TODO make this data apper into the render. right now only console logging
    console.log("You called the orderID " + props.location.state.orderID + " information")
    axios.get('http://localhost:8080/order/' + props.location.state.orderID)
            .then(function (response) {
              setOrderInfo(response.data)
              setOrderRender(true)
              console.log(response.data)
            });
  }

  function orderInfoRender()
  {
    if(orderRender === true)
    {
      return (
        <div className="container">
        <div className="upperPortionPackaging">
          <div className="theBIGP">P </div>
          <div className="nextToPLabel">
            <div className="firstClass">First Class Shipping</div>
            <div className="orderID">OrderID: {orderInfo.id}</div>
            <div className="dateProcessed">{orderInfo.datePurchased}</div>
          </div>
        </div>
        <div className="shippingService">UPS FIRST-CLASS PKG</div>
        <div className="midPortionPackaging">
          <div className="companyInformation">
            <div className="warehouse">
              Warehouse 2
            </div>
            <div className="companyName">
              Calf Co
            </div>
            <div className="companyName">
              9692 Baumgartner St
            </div>
            <div className="stateShipping">
              Huntley IL 66666-6666
            </div>
          </div>
          <div className="weight">
            Weight: {orderInfo.weight} oz
          </div>
          <div className="recipientInfo">
            <div className="recipientName">{orderInfo.customer.firstName} {orderInfo.customer.lastName}</div>
            <div className="recipientAddress">{orderInfo.customer.address}</div>
            <div className="recipientState">Huntley IL 66666-6666</div>
          </div>
        </div>
        <div className="bottomPortionPackaging">
          <img src={barcode}></img>
        </div>
        </div>
      )
    }
    return
  }

  return (
    <div>
      {orderInfoRender()}
    </div>
  );
}

export default WareHouseShipping;