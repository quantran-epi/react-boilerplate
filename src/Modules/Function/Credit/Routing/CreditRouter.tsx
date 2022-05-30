import { Card } from '@components/Card';
import React from 'react';
import { Outlet } from 'react-router-dom';

export const CreditRouter = () => {
    return <div className='credit-router'>
        <Card headStyle={{backgroundColor: "#ccc"}} title="Hệ thống ứng dụng thẻ" size="small">
            <Outlet />
        </Card>
    </div>
}