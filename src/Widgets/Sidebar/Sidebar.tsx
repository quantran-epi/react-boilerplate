import {
    CaretLeftOutlined, CreditCardFilled, SearchOutlined
} from '@ant-design/icons';
import { AppColor } from '@common/Constants/AppColor';
import { Sidebar } from '@components/Layout/Sidebar';
import { Space } from '@components/Layout/Space';
import { Typography } from '@components/Typography';
import { Form } from '@components/Form';
import { useSidebar } from '@hooks';
import { ISidebarItem } from '@models/Sidebar';
import { Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Input } from '@components/Form/Input';
import { Box } from '@components/Layout/Box';

type MenuItem = Required<MenuProps>['items'][number];

export const SidebarWidget = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { sideBarItems, selectedItems, openItems, setOpenItems, searchText, onChangeSearchText } = useSidebar();
    const navigate = useNavigate();
    const { t } = useTranslation("Common");

    const _handleMenuItemClick = (item: ISidebarItem) => {
        if (item.href) navigate(item.href);
    }

    const _getMenuItemRecursive = (item: ISidebarItem): MenuItem => {
        return {
            label: item.label,
            key: item.key,
            icon: item.icon,
            onClick: () => _handleMenuItemClick(item),
            children: item.children ? item.children.map(_getMenuItemRecursive) : undefined,
            style: {
                fontWeight: openItems.includes(item.key) ? "bold" : "normal"
            }
        };
    }

    const _menuItems = useMemo<MenuItem[]>(() => {
        return sideBarItems.map(_getMenuItemRecursive);
    }, [sideBarItems, openItems])

    const _highlightFirstCharacter = (text: string) => {
        return text.toUpperCase().split(' ').map((word, index) => {
            return <Space size={0.5} align="end" key={index}>
                <Typography.Title style={{ margin: 0, color: AppColor.primary, fontWeight: "bolder", fontFamily: "Fira Sans" }} level={5}>{word[0]}</Typography.Title>
                <Typography.Title style={{ margin: 0, fontFamily: "Fira Sans", color: '#363534' }} level={5}>{word.substring(1)}</Typography.Title>
            </Space>
        });
    }

    return <Sidebar
        trigger={<CaretLeftOutlined />}
        width={280}
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={{ backgroundColor: "#fff" }}>
        <Space direction="vertical" size={"middle"} style={{ padding: 20 }}>
            <Space>
                <CreditCardFilled style={{ fontSize: 28, color: AppColor.primary }} />
                {/* <Typography.Title level={5} style={{ margin: 0, color: AppColor.primary, fontFamily: "Fira Sans" }}>{t("TopNavigation.AppNameAbbr")}</Typography.Title> */}
                <Space size={6}>
                    {_highlightFirstCharacter(t("TopNavigation.AppNameAbbr"))}
                </Space>
            </Space>
            {/* <Typography.Title level={5} type="secondary" style={{ margin: 0 }}>{t("TopNavigation.AppName")}</Typography.Title> */}
        </Space>
        <Box style={{ padding: "0 20px 20px 20px" }}>
            <Input
                autoFocus
                prefix={<SearchOutlined />}
                placeholder="Search"
                value={searchText}
                onChange={e => onChangeSearchText(e.target.value)} />
        </Box>
        <Menu
            theme="light"
            mode="inline"
            items={_menuItems}
            openKeys={openItems}
            selectedKeys={selectedItems}
            onOpenChange={setOpenItems} />
    </Sidebar >
}