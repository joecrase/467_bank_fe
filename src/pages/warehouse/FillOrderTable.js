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
import Assignment from '@material-ui/icons/Assignment';

import Button from '@material-ui/core/Button';

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
    Assignment: forwardRef((props, ref) => <Assignment {...props} ref={ref} />),
};

//TODO: Add a filled field to each cart item

function createData(
    number,
    description,
    price,
    weight,
    pictureURL,
    amount,
    filled
) {
    return {
        number,
        description,
        price,
        weight,
        pictureURL,
        amount,
        filled,
    };
}

export default function FillOrderTable(props) {
    const [FullOrder, setFullOrder] = useState(
        props.data['cart'].map((value) => {
            return createData(
                value['part'].number,
                value['part'].description,
                value['part'].price,
                value['part'].weight,
                value['part'].pictureURL,
                value.amount,
                value.filled
            );
        })
    );
    const [Loaded, setLoaded] = useState(false);

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);


    useEffect(() => {
        setLoaded(true);

        return () => {
            handleClose();
        }
    }, [])

    function handleClose(){
        props.handleClose(FullOrder);
    }

    function setFilledState(cartId) {

        let temp = FullOrder;

        temp[cartId].filled = !temp[cartId].filled;
        setFullOrder(temp);
    }

    return (
        <div>
            {Loaded ? (
                <MaterialTable
                    title='Orders to be Filled'
                    icons={tableIcons}
                    options={{ search: false, pageSize: 5 }}
                    columns={[
                        { title: 'Part Number', field: 'number' },
                        {
                            title: 'Description',
                            field: 'description',
                        },
                        {
                            title: 'Weight Per',
                            field: 'weight',
                        },
                        {
                            title: 'Amount',
                            field: 'amount',
                        },
                    ]}
                    data={FullOrder}
                    actions={[
                        {
                            icon: 'save',
                            tooltip: 'Save User',
                            onClick: (event, rowData) => {
                                forceUpdate();
                                setFilledState(rowData.data.tableData.id);
                            }, // table ID is the same as cart entry
                        },
                    ]}
                    components={{
                        Action: (props) => (
                            <Button
                                onClick={(event) =>
                                    props.action.onClick(event, props)
                                }
                                color='red'
                                variant='contained'
                                style={{
                                    textTransform: 'none',
                                    background: FullOrder[
                                        props.data.tableData.id
                                    ].filled
                                        ? 'green'
                                        : 'red',
                                }}
                                size='small'>
                                Fill Order
                            </Button>
                        ),
                    }}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                    detailPanel={[
                        {
                            tooltip: 'Show Picture',
                            render: (rowData) => {
                                return (
                                    <div className='detailPanel'>
                                        <img
                                            src={rowData.pictureURL}
                                            alt='new'
                                        />
                                    </div>
                                );
                            },
                        },
                    ]}
                />
            ) : (
                ''
            )}{' '}
        </div>
    );
}
