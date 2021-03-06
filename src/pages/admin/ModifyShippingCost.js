import React, { forwardRef, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
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

export default function ModifyShippingCost(props) {
    const [state, setState] = useState({
        columns: [
            { title: 'Max Weight', field: 'maxWeight', type: 'numeric' },
            { title: 'Price', field: 'price', type: 'numeric' },
        ],
        data: props.shippingCosts,
    });

    const [loaded, setLoaded] = useState(false);
    const [OrderDetails, setOrderDetails] = useState([]);


    useEffect(() => {
        if (loaded) {
            console.log(state);
            setShippingCost();
        } else {
            setLoaded(true);
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function setShippingCost(data) {
        await axios
            .post('http://localhost:8080/shippingCost/modify', data)
            .then(({ data }) => {
                setState({
                    columns: [
                        {
                            title: 'Max Weight',
                            field: 'maxWeight',
                            type: 'numeric',
                        },
                        { title: 'Price', field: 'price', type: 'numeric' },
                    ],
                    data: data,
                });
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    async function addShippingCost(data) {
        await axios
            .post('http://localhost:8080/shippingCost/add', data)
            .then(({ data }) => {
                setState({
                    columns: [
                        {
                            title: 'Max Weight',
                            field: 'maxWeight',
                            type: 'numeric',
                        },
                        { title: 'Price', field: 'price', type: 'numeric' },
                    ],
                    data: data,
                });
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <MaterialTable
            title='Modify Shipping Cost'
            columns={state.columns}
            data={state.data}
            icons={tableIcons}
            editable={{
                onRowAdd: (newData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                addShippingCost(data);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            if (oldData) {
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data[data.indexOf(oldData)] = newData;
                                    setShippingCost(data);
                                    return { ...prevState, data };
                                });
                            }
                        }, 600);
                    }),
                onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                        setTimeout(() => {
                            resolve();
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                setShippingCost(data);
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
    );
}
