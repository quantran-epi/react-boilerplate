import { AppColor } from "@common/Constants/AppColor";
import { Spin } from "@components/Spin";
import { ISidebarItem } from "@models/Sidebar";
import React, { FunctionComponent, useState } from "react";
import { Box } from "../Box";
import { Space } from "../Space";
import { SidebarMenuSelectMode } from "./SidebarMenu.types";
import { SidebarMenuItem } from "./SidebarMenuItem";

interface ISidebarMenuProps {
    fetching?: boolean;
    items: ISidebarItem[];
    openKeys?: string[];
    selectedKeys?: string[];
    collapsed?: boolean;
    onOpenChanged?: (openKeys: string[]) => void;
    selectMode: SidebarMenuSelectMode;
    onItemClick: (item: ISidebarItem) => void;
}

export const SidebarMenu: FunctionComponent<ISidebarMenuProps> = ({
    items,
    openKeys = [],
    selectedKeys = [],
    collapsed = false,
    selectMode = "single",
    onOpenChanged,
    onItemClick,
    fetching
}) => {
    const _containerStyle = (): React.CSSProperties => {
        return {
            paddingLeft: collapsed ? 10 : 0,
            width: "100%",
            overflowY: "auto",
            flex: 1,
        }
    }

    const _openItem = (key: string) => {
        if (!onOpenChanged) return;
        onOpenChanged([...openKeys, key]);
    }

    const _closeItem = (key: string) => {
        if (onOpenChanged) onOpenChanged(openKeys.filter(k => k !== key));
    }

    const _hasChildren = (item: ISidebarItem): boolean => {
        return item.children !== undefined && item.children.length > 0;
    }

    const _isOpen = (key: string): boolean => {
        return openKeys.includes(key);
    }

    const _isSelected = (key: string): boolean => {
        return selectedKeys.includes(key);
    }

    const _onItemClick = (item: ISidebarItem) => {
        if (!_hasChildren(item)) {
            onItemClick(item);
            return;
        }

        if (item.level === 0) {
            if (_isOpen(item.key)) _closeItem(item.key);
            else if (onOpenChanged) onOpenChanged([item.key]);
        }
        else {
            if (_isOpen(item.key)) _closeItem(item.key);
            else _openItem(item.key);
        }
    }

    const _onClose = (item: ISidebarItem) => {
        if (!openKeys.includes(item.key)) return;
        if (onOpenChanged) onOpenChanged(openKeys.filter(key => key !== item.key));
    }

    const _renderItem = (item: ISidebarItem) => {
        return <SidebarMenuItem
            key={item.key}
            onClick={() => _onItemClick(item)}
            hasChildren={_hasChildren(item)}
            open={_isOpen(item.key)}
            selected={_isSelected(item.key)}
            mode={collapsed ? "collapsed" : "expanded"}
            data={item}
            onClose={_onClose}>
            {item.children?.map(_renderItem)}
        </SidebarMenuItem>
    }

    return <Space style={_containerStyle()} direction="vertical" size={0}>
        {fetching && <Spin spinning style={{ width: '100%' }} />}
        {items.map(_renderItem)}
    </Space>
}