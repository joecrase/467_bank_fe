import React from 'react'

import SelectField from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

export default function orderSearch() {
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ display: 'flex', margin: 'auto' }}>
                    <TextField
                        hintText='Query'
                        floatingLabelText='Query'
                        // value={this.state.query}
                        // onChange={(e) =>
                        //     this.setState({ query: e.target.value })
                        // }
                    />
                    <SelectField
                        style={{ marginLeft: '1em' }}
                        floatingLabelText='Select a column'
                        // value={this.state.columnToQuery}
                        value = "Default"
                        // onChange={(event, index, value) =>
                        //     this.setState({ columnToQuery: value })
                        // }
                        >
                        <MenuItem value='firstName' primaryText='First Name' />
                        <MenuItem value='lastName' primaryText='Last Name' />
                        <MenuItem value='username' primaryText='Username' />
                        <MenuItem value='email' primaryText='Email' />
                    </SelectField>
                </div>
            </div>
        </div>
    )
}
