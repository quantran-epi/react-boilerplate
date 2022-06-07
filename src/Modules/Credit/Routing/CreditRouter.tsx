import { blue } from '@ant-design/colors';
import { Card } from '@components/Card';
import { Helmet } from '@components/Layout/Helmet';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const CreditRouter = () => {
    const { t } = useTranslation("Credit", { keyPrefix: "Common" })

    return <div className='credit-router'>
        <Helmet title={t("Header.Title")} />
        <Card headStyle={{ backgroundColor: blue.primary, color: "white" }} title={t("Header.Title")} size="small">
            <Outlet />
        </Card>
    </div>
}