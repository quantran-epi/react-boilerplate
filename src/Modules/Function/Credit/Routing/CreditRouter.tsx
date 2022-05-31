import { blue } from '@ant-design/colors';
import { Card } from '@components/Card';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const CreditRouter = () => {
    return <div className='credit-router'>
        <Card headStyle={{ backgroundColor: blue.primary, color: "white" }} title="Thẻ tín dụng" size="small">
            <Outlet />
        </Card>
    </div>
}