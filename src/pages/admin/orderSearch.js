import React, { useState } from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import './../../CSS/adminView.css';

const styles = (theme) => ({
    select: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        },
    },
    icon: {
        fill: 'white',
    },
});

export default function OrderSearch(props) {
    const [columnSelected, setColumnSelected] = useState('');

    const classes = styles;

    function handleSelectionChange(event) {
        setColumnSelected(event.target.value);
        props.handleSelection(event.target.value);
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', margin: 'auto' }}>
                    <div className='textField'>
                        <TextField
                            id='outlined-basic'
                            label='Search'
                            defaultValue='Search Field'
                            value={props.query}
                            onChange={(e) => props.handleSearch(e.target.value)}
                        />
                    </div>
                    <div className='selectField'>
                        <FormControl>
                            <Select
                                className='Select'
                                value={columnSelected}
                                onChange={handleSelectionChange}
                                displayEmpty>
                                {props.columnHeaders.map((entry) => {
                                    return (
                                        <MenuItem
                                            className='MenuItem'
                                            value={entry}>
                                            {entry}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                            <FormHelperText>Column Select</FormHelperText>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    );
}
