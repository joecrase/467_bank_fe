import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import OrderSpecifics from './viewOrderSpecifics';
import axios from 'axios';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

function createData(number, description, price, weight, pictureURL, amount) {
    return {
        number,
        description,
        price,
        weight,
        pictureURL,
        amount,
    };
}

export default function ViewOrderWithDetails(props) {
    const [OrderDetails, setOrderDetails] = useState([]);
    const [LoadOrderDetails, setLoadOrderDetails] = useState(true);

    async function getOrderDetails(orderId) {
        if (LoadOrderDetails) {
            await axios
                .get('http://localhost:8080/order/' + orderId)
                .then(({ data }) => {
                    console.log(data);
                    setOrderDetails(data);
                    setLoadOrderDetails(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    return (
        <div>
            <MaterialTable
                title='Order'
                icons={tableIcons}
                options={{ search: false, pageSize: 5 }}
                columns={[
                    { title: 'Order ID', field: 'orderId' },
                    { title: 'First Name', field: 'firstName' },
                    {
                        title: 'Last Name',
                        field: 'lastName',
                    },
                    {
                        title: 'Total Weight',
                        field: 'totalWeight',
                    },
                    {
                        title: 'Date Processed',
                        field: 'dateProcessed',
                    },
                    {
                        title: 'Total Price',
                        field: 'totalPrice',
                    },
                    {
                        title: 'Order Status',
                        field: 'orderStatus',
                    },
                ]}
                data={props.data}
                detailPanel={[
                    {
                        tooltip: 'Show Order Details',
                        render: (rowData) => {
                            return (
                                <div className="detailPanel">
                                    {console.log(
                                        props.data)}
                                    <div className="partTable">
                                        <OrderSpecifics
                                            rows={props.fullData[
                                                rowData.orderId - 1
                                            ]['cart'].map((value) => {
                                                return createData(
                                                    value['part'].number,
                                                    value['part'].description,
                                                    value['part'].price,
                                                    value['part'].weight,
                                                    value['part'].pictureURL,
                                                    value.amount
                                                );
                                            })}
                                        />
                                    </div>
                                </div>
                            );
                        },
                    },
                ]}
            />
        </div>
    );
}
