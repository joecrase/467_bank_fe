import React from 'react';

import OrderTable from './viewOrderTable';
import OrderSearch from './orderSearch';

import './../../CSS/adminView.css';

export default function adminView() {
    return (
        <div className='background'>
            <div className='adminTitle'>Calf Co Admin Interface</div>
            <div className='orderSearch'>
                <OrderSearch/>
            </div>
            <div className='orderTable'>
                <OrderTable />
            </div>
        </div>
    );
}
