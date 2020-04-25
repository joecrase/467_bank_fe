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

const rows = [
    createData(1, 'Joseph', 'Crase', 12.2, '2020/04/11', 20.0, 'authorized'),
    createData(2, 'Emily', 'Holiday', 64.02, '2020/01/15', 150.0, 'shipped'),
    createData(3, 'Carolynn', 'DeGire', 2.07, '2019/08/22', 15.3, 'filling'),
    createData(4, 'Leonard', 'LaCroix', 209.34, '2020/09/03', 600.0, 'shipped'),
    createData(5, 'Lisa', 'Redwood', 22.22, '2020/05/04', 50.78, 'authorized'),
    createData(
        6,
        'Johnny',
        'Appleseed',
        42.39,
        '2020/03/22',
        100.09,
        'filling'
    ),
    createData(7, 'Bob', 'Belcher', 5.05, '2020/03/20', 20.67, 'shipped'),
    createData(8, 'Isabel', 'Trapped', 78.39, '2020/04/20', 250.98, 'shipped'),
    createData(9, 'Johnny', 'Appleseed', 20.35, '2020/03/06', 47.83, 'shipped'),
    createData(10, 'Paul', 'Bunion', 47.39, '2019/03/24', 124.03, 'filling'),
]; // temporary dummy data

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

    useEffect(() => {
        axios
            .get('http://localhost:8080/order/all')
            .then(({ data }) => {
                console.log(data);
                // setAllOrders(data); TODO: Get orders info from database
            })
            .catch((error) => {
                console.log(error);
            });

        setAllOrders(rows);
        console.log(rows);

        return () => {};
    }, []);

    function handleSearch(query) {
        setQuery(query);
    }

    function handleSelection(selection) {
        switch (selection) {
            case columnHeaders[0]:
                setSelection("orderId");
                break;
            case columnHeaders[1]:
                setSelection("firstName");
                break;
            case columnHeaders[2]:
                setSelection("lastName");
                break;
            case columnHeaders[3]:
                setSelection("totalWeight");
                break;
            case columnHeaders[4]:
                setSelection("dateProcessed");
                break;
            case columnHeaders[5]:
                setSelection("totalPrice");
                break;
            case columnHeaders[6]:
                setSelection("orderStatus");
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

    let display = showShipping ? (
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
                        if(entry[selection] !== undefined)
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
