import { CreditCardFilled, DoubleLeftOutlined, DoubleRightOutlined, SearchOutlined } from '@ant-design/icons';
import { AppColor } from '@common/Constants/AppColor';
import { Button } from '@components/Button';
import { Input } from '@components/Form/Input';
import { Box } from '@components/Layout/Box';
import { Sidebar } from '@components/Layout/Sidebar';
import { SidebarMenu } from '@components/Layout/SidebarMenu';
import { Space } from '@components/Layout/Space';
import { Stack } from '@components/Layout/Stack';
import { Typography } from '@components/Typography';
import { useSidebar } from '@hooks';
import { ISidebarItem } from '@models/Sidebar';
import { QueryFactory } from '@queries';
import { useStore } from '@store';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

export const SidebarWidget = () => {
    const [collapsed, setCollapsed] = useState(false);
    const _services = useStore(store => store.services);
    const { data, isFetching } = useQuery(QueryFactory.Sidebar.Menu(), {
        queryFn: async (context) => {
            return await _services.Permission.Menu.filterAuthorized();
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60 * 24 * 30
    });
    const {
        sideBarItems, selectedItems, openItems, setOpenItems, searchText, onChangeSearchText
    } = useSidebar({ mode: "single", serverMenuItems: data || [] });
    const navigate = useNavigate();
    const { t } = useTranslation("Common");
    const _handleMenuItemClick = (item: ISidebarItem) => {
        if (item.href) navigate(item.href);
    }

    const _highlightFirstCharacter = (text: string) => {
        return text.toUpperCase().split(' ').map((word, index) => {
            return <Space size={0.5} align="end" key={index}>
                <Typography.Title style={{ margin: 0, color: AppColor.primary, fontWeight: "bolder", fontFamily: "Fira Sans" }} level={5}>{word[0]}</Typography.Title>
                <Typography.Title style={{ margin: 0, fontFamily: "Fira Sans", color: '#363534' }} level={5}>{word.substring(1)}</Typography.Title>
            </Space>
        });
    }

    return <Sidebar
        collapsible
        width={320}
        trigger={null}
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={{ backgroundColor: "#fff" }}>
        <Stack direction="row" justify={collapsed ? "center" : "space-between"} style={{ padding: 20, width: "100%" }}>
            {!collapsed && <Space>
                <CreditCardFilled style={{ fontSize: 28, color: AppColor.primary }} />
                <Space size={6}>
                    {_highlightFirstCharacter(t("TopNavigation.AppNameAbbr"))}
                </Space>
            </Space>}
            {collapsed && <Button style={{ padding: 0 }} type='link' onClick={() => setCollapsed(false)}><DoubleRightOutlined /></Button>}
            {!collapsed && <Button style={{ padding: 0 }} type='link' onClick={() => setCollapsed(true)}><DoubleLeftOutlined /></Button>}
        </Stack>
        {!collapsed && <Box style={{ padding: "0 20px 20px 20px" }}>
            <Input
                autoFocus
                prefix={<SearchOutlined />}
                placeholder="Search"
                value={searchText}
                onChange={e => onChangeSearchText(e.target.value)} />
        </Box>}
        <SidebarMenu
            fetching={isFetching}
            selectMode="single"
            items={sideBarItems}
            openKeys={openItems}
            selectedKeys={selectedItems}
            onOpenChanged={setOpenItems}
            collapsed={collapsed}
            onItemClick={_handleMenuItemClick} />
        {/* <Menu
            theme="light"
            mode="inline"
            items={_menuItems}
            openKeys={openItems}
            selectedKeys={selectedItems}
            onOpenChange={setOpenItems} /> */}
    </Sidebar >
}