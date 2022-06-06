import {
    CaretLeftOutlined
} from '@ant-design/icons';
import { Sidebar } from '@components/Layout/Sidebar';
import { useSidebar } from '@hooks';
import { ISidebarItem } from '@models/Sidebar';
import { Menu, MenuProps } from 'antd';
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

export const SidebarWidget = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { sideBarItems, selectedItems, openItems, setOpenItems } = useSidebar();
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

    const _menuItems = useMemo<MenuItem[]>(() => {
        return sideBarItems.map(_getMenuItemRecursive);
    }, [sideBarItems])

    return <Sidebar
        trigger={<CaretLeftOutlined />}
        width={280}
        collapsed={collapsed}
        onCollapse={value => setCollapsed(value)}
        style={{ backgroundColor: "#fff" }}>
        <Menu
            theme="light"
            mode="inline"
            items={_menuItems}
            openKeys={openItems}
            selectedKeys={selectedItems}
            onOpenChange={setOpenItems} />
    </Sidebar>
}