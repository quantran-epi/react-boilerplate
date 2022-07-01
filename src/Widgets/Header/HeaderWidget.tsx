import { AppShadow } from "@common/Constants/Shadow";
import { Button } from "@components/Button";
import { Dropdown } from "@components/Dropdown";
import { Header } from "@components/Layout/Header";
import { Space } from "@components/Layout/Space";
import { Stack } from "@components/Layout/Stack";
import { Menu } from "@components/Menu";
import { Typography } from "@components/Typography";
import { RootRoutes } from "@routing/RootRoutes";
import { useStore } from "@store";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { NotificationWidget } from "@widgets/Notification";

interface IHeaderWidgetProps {

}

export const HeaderWidget: FunctionComponent<IHeaderWidgetProps> = ({

}) => {
    const { t } = useTranslation("Common");
    const services = useStore(state => state.services);
    const navigate = useNavigate();
    const currentFunction = useStore((state: any) => state.currentFunction);
    const _onLogoutClick = () => {
        services.Auth.Authentication.logout();
        navigate(RootRoutes.AuthRoutes.Login);
    }

    return <Header className="header" style={{
        paddingInline: 25,
        marginBottom: 25,
        backgroundColor: "#fff",
        borderRadius: 10,
        boxShadow: AppShadow.card
    }}>
        <Stack justify="space-between">
            <Typography.Title style={{ margin: 0 }} level={4}>{currentFunction}</Typography.Title>
            <Space>
                <NotificationWidget />
                <Dropdown
                    placement="bottomRight"
                    overlay={<Menu
                        items={[
                            {
                                label: t("TopNavigation.User.Logout"),
                                key: '0',
                                onClick: _onLogoutClick,
                                icon: <LogoutOutlined />
                            }
                        ]}
                    />} trigger={['click']}>
                    <Space size={0}>
                        <Button type="text" style={{ paddingRight: 5, paddingLeft: 5 }}><Typography.Text>{services.Auth.Authentication.getAuthenticatedUser()?.username}</Typography.Text></Button>
                        <Button shape="circle" icon={<UserOutlined />} size="large" />
                    </Space>
                </Dropdown>
            </Space>
        </Stack>
    </Header>
}