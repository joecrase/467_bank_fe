import React, { useState } from 'react';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import './../../CSS/adminView.css';

export default function OrderSearch(props) {
    const [columnSelected, setColumnSelected] = useState('');

    function handleSelectionChange(event) {
        setColumnSelected(event.target.value);
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', margin: 'auto' }}>
                    <div className='selectField'>
                        <TextField
                        value={props.query}
                        onChange={(e) =>
                            props.handleSearch(e.target.value)
                         }
                        />
                    </div>
                    <div className='selectField'>
                        <FormControl>
                            <Select
                                value={columnSelected}
                                onChange={handleSelectionChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}>
                                {props.columnHeaders.map((entry) => {
                                    return (
                                        <MenuItem value={entry}>
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
