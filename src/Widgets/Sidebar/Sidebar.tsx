import { Sidebar } from '@components/Layout/Sidebar';
import { Menu, MenuProps } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { ISidebarItem, SidebarConfig } from '@configs/SidebarConfig';
import { useSidebar } from '@hooks';

type MenuItem = Required<MenuProps>['items'][number];

export const SidebarWidget = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { sideBarItems } = useSidebar();
    const navigate = useNavigate();

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
        };
    }

    const _getSelectedMenu = (): string[] | undefined => {
        return sideBarItems.filter(e => e.selected).map(e => e.key);
    }

    const _menuItems = useMemo<MenuItem[]>(() => {
        return sideBarItems.map(_getMenuItemRecursive);
    }, [sideBarItems])

    return <Sidebar width={300} collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={_menuItems} selectedKeys={_getSelectedMenu()} />
    </Sidebar>
}