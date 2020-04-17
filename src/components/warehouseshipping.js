import React, { useState, useEffect } from 'react';
import barcode from "./../themPics/blog-make-shipping-easier-by-making-labels-easier-blog-preview.jpg"
import "./../CSS/warehouseshipping.css"

function WareHouseShipping(props) {

  useEffect(() => {
    
  } , []);

  return (
    <div className="container">
        <div className="upperPortionPackaging">
          <div className="theBIGP">P </div>
          <div className="nextToPLabel">
            <div className="firstClass">First Class Shipping</div>
            <div className="orderID">OrderID</div>
            <div className="dateProcessed">Date Processed</div>
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
            Weight: A lot of oz
          </div>
          <div className="recipientInfo">
            <div className="recipientName">Ryan Llamas</div>
            <div className="recipientAddress">9696 Baumgartner St</div>
            <div className="recipientState">Huntley IL 66666-6666</div>
          </div>
        </div>
        <div className="bottomPortionPackaging">
          <img src={barcode}></img>
        </div>
    </div>
  );
}

export default WareHouseShipping;