import { Sidebar } from '@components/Layout/Sidebar';
import { ISidebarItem } from '@configs/SidebarConfig';
import { useSidebar } from '@hooks';
import { Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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