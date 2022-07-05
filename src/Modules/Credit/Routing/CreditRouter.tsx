import { Helmet } from '@components/Layout/Helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const CreditRouter = () => {
    const { t } = useTranslation("Credit", { keyPrefix: "Common" })

    return <div className='credit-router'>
        <Helmet title={t("Header.Title")} />
        <Outlet />
    </div>
}