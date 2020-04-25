import React, { useState, useEffect } from 'react';

import OrderTable from './ViewOrderTable';
import OrderSearch from './OrderSearch';
import CustomToolbar from './CustomToolbar';

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
    const [query, setQuery] = useState('');
    const [selection, setSelection] = useState('');
    const [loaded, setLoaded] = useState(false);

    let display;

    useEffect( () => {
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
                // setAllOrders(data); TODO: Get orders info from database
            })
            .catch((error) => {
                console.log(error);
            });
            setAllOrders(rows);
            setLoaded(true);
        }

        getAllOrders();

        return () => {};
    }, []);

    

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
        if (value === 'modifyShipping') {
            setShowShipping(!showShipping);
        }
    }

    function displayTable() {}

    display = showShipping ? (
        <div className='background'></div>
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

    return (
        <div className='background'>
            <div className='adminTitle'>
                <CustomToolbar handleButtonClick={handleButtonClick} />
            </div>
            {display}
        </div>
    );
}
