import React, { useState, useEffect } from 'react';

import OrderTable from './viewOrderTable';
import OrderSearch from './orderSearch';
import CustomToolbar from './CustomToolbar';
import ModifyShippingCost from './ModifyShippingCost';

import './../../CSS/adminView.css';
import axios from 'axios';

function createData(
    orderId,
    firstName,
    lastName,
    totalWeight,
    dateProcessed,
    totalPrice,
    orderStatus
) {
    return {
        orderId,
        firstName,
        lastName,
        totalWeight,
        dateProcessed,
        totalPrice,
        orderStatus,
    };
}

const rows = []; // temporary dummy data

const columnHeaders = [
    'Order ID',
    'First Name',
    'Last Name',
    'Total Weight',
    'Date Processed',
    'Total Price',
    'Order Status',
];

export default function AdminView() {
    const [showShipping, setShowShipping] = useState(false);
    const [allOrders, setAllOrders] = useState([]);
    const [shippingCosts, setShippingCosts] = useState([]);
    const [query, setQuery] = useState('');
    const [selection, setSelection] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [shippingLoaded, setShippingLoaded] = useState(false);

    let display;
    let table;

    useEffect(() => {
        getAllOrders();
        getAllShippingCosts();

        return () => {};
    }, []);

    async function getAllOrders() {
        await axios
            .get('http://localhost:8080/order/all')
            .then(({ data }) => {
                data.forEach((element) => {
                    rows.push(
                        createData(
                            element.id,
                            element.customer.firstName,
                            element.customer.lastName,
                            element.weight,
                            element.datePurchased,
                            element.priceTotal,
                            element.orderStatus
                        )
                    );
                });
            })
            .catch((error) => {
                console.log(error);
            });
        setAllOrders(rows);
        setLoaded(true);
    }

    async function getAllShippingCosts() {

        await axios
            .get('http://localhost:8080/shippingCost/all')
            .then(({ data }) => {
                setShippingCosts(data);
            })
            .catch((error) => {
                console.log(error);
            });
            setShippingLoaded(true)
    }

    function handleSearch(query) {
        setQuery(query);
    }

    function handleSelection(selection) {
        switch (selection) {
            case columnHeaders[0]:
                setSelection('orderId');
                break;
            case columnHeaders[1]:
                setSelection('firstName');
                break;
            case columnHeaders[2]:
                setSelection('lastName');
                break;
            case columnHeaders[3]:
                setSelection('totalWeight');
                break;
            case columnHeaders[4]:
                setSelection('dateProcessed');
                break;
            case columnHeaders[5]:
                setSelection('totalPrice');
                break;
            case columnHeaders[6]:
                setSelection('orderStatus');
                break;
            default:
                console.log(selection);
                break;
        }
    }

    function handleButtonClick(value) {
        if (value === 'Modify Shipping' || value === 'View Orders') {
            setShowShipping(!showShipping);
        }
    }

    table = showShipping ? (
        <div className='background'>
            <div className='shippingCost'>
                <ModifyShippingCost
                 shippingCosts={shippingCosts}
                 />
            </div>
        </div>
    ) : (
        <div className='background'>
            <div className='orderSearch'>
                <OrderSearch
                    query={query}
                    columnHeaders={columnHeaders}
                    handleSearch={handleSearch}
                    handleSelection={handleSelection}
                />
            </div>
            <div className='orderTable'>
                <OrderTable
                    rows={allOrders.filter((entry) => {
                        if (entry[selection] !== undefined)
                            return entry[selection].toString().includes(query);
                        return entry;
                    })}
                />
            </div>
        </div>
    );

    display = (loaded && shippingLoaded) ? (table) : ("");

    return (
        <div className='background'>
            <div className='adminTitle'>
                <CustomToolbar
                    handleButtonClick={handleButtonClick}
                    showShipping={showShipping}
                />
            </div>
            {display}
        </div>
    );
}
