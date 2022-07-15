import { Helmet } from '@components/Layout/Helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const ATMRouter = () => {
    const { t } = useTranslation("ATM", { keyPrefix: "Common" })

    return <div className='ATM-router'>
        <Helmet title={t("Meta.Title")} />
        <Outlet />
    </div>
}