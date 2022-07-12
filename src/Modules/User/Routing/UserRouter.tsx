import { Helmet } from '@components/Layout/Helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export const UserRouter = () => {
    const { t } = useTranslation("User", { keyPrefix: "Common" })

    return <div className='user-router'>
        <Helmet title={t("Header.Title")} />
        <Outlet />
    </div>
}