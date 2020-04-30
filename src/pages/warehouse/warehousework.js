import React, { useState, useEffect } from 'react';

import OrderTable from './viewOrderTable';
import OrderTableWithDetails from './viewOrderWithDetails';
import OrderSearch from './orderSearch';
import CustomToolbar from './CustomToolbar';
import FillOrderModal from './fillOrderModal';

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

function createRowData(orderId, part, amount) {
    return {
        orderId,
        part,
        amount,
    };
}

function createRequestCart(partID, amount, filled) {
    return {
        partID,
        amount,
        filled,
    };
}

let rows = []; // temporary dummy data
const rowData = [];

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
    const [allFullOrders, setAllFullOrders] = useState([]);
    const [shippingCosts, setShippingCosts] = useState([]);
    const [query, setQuery] = useState('');
    const [selection, setSelection] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [shippingLoaded, setShippingLoaded] = useState(false);
    const [OpenModal, setOpenModal] = useState(false); // handles opening of fill order modal
    const [OrderSelected, setOrderSelected] = useState(''); // current order id being filled

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    let display;
    let table;

    useEffect(() => {
        getAllOrders();

        return () => {};
    }, []);

    async function updateOrder(data) {
        console.log(data);
        let cartRequest = [];

        var i;

        for (i = 0; i < data.cart.length; i++) {
            cartRequest.push(
                createRequestCart(
                    data.cart[i].number,
                    data.cart[i].amount,
                    data.cart[i].filled
                )
            );
        }

        console.log(cartRequest);

        await axios
            .post(
                'http://localhost:8080/order/updateFilling/' +
                    data.id +
                    '/' +
                    data.orderStatus,
                cartRequest
            )
            .then(({ data }) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });

        await getAllOrders();
    }

    async function getAllOrders() {
        await axios
            .get('http://localhost:8080/order/all')
            .then(({ data }) => {
                setAllFullOrders(
                    data.filter((entry) => {
                        return entry.orderStatus !== 'shipped';
                    })
                );

                rows = [];

                data.forEach((element) => {
                    if (element.orderStatus !== 'shipped') {
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
                    }
                });

                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
        setAllOrders(rows);
        setLoaded(true);
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

    function handleButtonClick(value) {}

    function handleOpen(rowData) {
        setOrderSelected(rowData.orderId);
        setOpenModal(true);
    }

    function handleClose(data) {
        setOpenModal(false);
        console.log(data);

        updateOrder(data);
    }

    table = (
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
                <OrderTableWithDetails
                    data={allOrders.filter((entry) => {
                        if (entry[selection] !== undefined)
                            return entry[selection].toString().includes(query);
                        return entry;
                    })}
                    fullData={allFullOrders}
                    handleOpen={handleOpen}
                />
            </div>
            <div>
                {OpenModal ? (
                    <FillOrderModal
                        open={OpenModal}
                        handleClose={handleClose}
                        data={allFullOrders[OrderSelected]}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );

    display = loaded ? table : '';

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
