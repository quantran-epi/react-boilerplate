import { blue } from '@ant-design/colors';
import { Card } from '@components/Card';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const CreditRouter = () => {
    const { t } = useTranslation("Credit", { keyPrefix: "Common" })

    return <div className='credit-router'>
        <Card headStyle={{ backgroundColor: blue.primary, color: "white" }} title={t("Header.Title")} size="small">
            <Outlet />
        </Card>
    </div>
}