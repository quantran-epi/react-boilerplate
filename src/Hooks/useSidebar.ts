import { IServerMenuItem } from "@models/Server/ServerMenuItem";
import { ISidebarItem } from "@models/Sidebar";
import { uniq } from 'lodash';
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

interface IUseSidebar {
    sideBarItems: ISidebarItem[];
    selectedItems: string[];
    openItems: string[];
    addOpenItem: (key: string) => void;
    removeOpenItem: (key: string) => void;
    setOpenItems: (keys: string[]) => void;
    searchText: string;
    onChangeSearchText: (value: string) => void;
}

interface IUseSidebarProps {
    mode: "single" | "multiple";
    serverMenuItems?: IServerMenuItem[];
}

var emptyArr = [] as any[];

export const useSidebar = ({
    mode = "single",
    serverMenuItems = emptyArr
}: IUseSidebarProps): IUseSidebar => {

    const _transformServerMenuItem = (): ISidebarItem[] => {
        let _serverMenuItems = serverMenuItems.map<ISidebarItem>(e => ({
            key: e.id.toString(),
            label: e.title,
            href: e.link || undefined,
            parentId: e.parentId?.toString(),
            children: []
        })) || [];

        function getChildren(sideBarItemId: string): any[] {
            let children = _serverMenuItems.filter(e => e.parentId === sideBarItemId);
            if (children.length === 0) return [];

            return children.map(child => ({
                ...child,
                children: getChildren(child.key)
            }))
        }

        return _serverMenuItems.filter(e => !e.parentId).map(e => ({
            ...e,
            children: getChildren(e.key)
        }))
    }

    const _transformSidebarItems = (items: ISidebarItem[], level: number, parent?: ISidebarItem): ISidebarItem[] => {
        return items.map(item => {
            return { ...item, level: level, parent: parent, children: _transformSidebarItems(item.children || [], level + 1, item) };
        })
    }

    const location = useLocation();
    const [_openItems, _setOpenItems] = useState<string[]>([]);
    const [_sideBarItems, _setSideBarItems] = useState<ISidebarItem[]>([]);
    const [_searchText, _setSearchText] = useState<string>("");

    useEffect(() => {
        let sidebarItems = _transformSidebarItems(_transformServerMenuItem(), 0, undefined);
        _setSideBarItems(sidebarItems);
        let selectedItems = _selectedItems(sidebarItems);
        _setOpenItems(uniq(sidebarItems.map(item => _getParentOfSelected(item, "", selectedItems)).flat()));
    }, [serverMenuItems, location])

    const _getParentOfSelected = (item: ISidebarItem, parent: string, selectedItems: string[]): string[] => {
        if (selectedItems.includes(item.key)) return [parent];
        let values = item.children?.map(e => _getParentOfSelected(e, item.key, selectedItems)).flat();
        if (values && values?.length > 0) return [item.key, ...values];
        return [];
    }

    const _selectedItems = (sidebarItems: ISidebarItem[]): string[] => {
        return sidebarItems.map(item => _getSelected(item)).flat();
    }

    const _getSelected = (item: ISidebarItem): string[] => {
        if ((!item.children || item.children.length === 0))
            return _isSelected(item.href) ? [item.key] : [];

        return item.children.map(child => _getSelected(child)).flat();
    }

    const _isSelected = (href?: string): boolean => {
        return href === undefined ? false : location.pathname === href;
    }

    const _addOpenItem = (key: string) => {
        _setOpenItems([..._openItems, key]);
    }

    const _removeOpenItem = (key: string) => {
        _setOpenItems(_openItems.filter(e => e !== key));
    }

    const _isMatch = (title: string): boolean => {
        return title.toLowerCase().includes(_searchText.toLowerCase());
    }

    const _flatten = (array: ISidebarItem[], result: ISidebarItem[]) => {
        array.forEach(function (el) {
            if (el.children && el.children.length > 0) {
                _flatten(el.children, result);
            } else {
                result.push(el);
            }
        });
    }

    const _filteredSidebarItems = (): ISidebarItem[] => {
        if (_searchText === "")
            return _sideBarItems;

        let flattenedItems = [] as ISidebarItem[];
        _flatten(_sideBarItems, flattenedItems);
        return flattenedItems.filter(item => _isMatch(item.label)).map(e => ({ ...e, level: 0 })); // convert all to level 0
    }

    return {
        sideBarItems: _filteredSidebarItems(),
        selectedItems: _selectedItems(_sideBarItems),
        openItems: _openItems,
        addOpenItem: _addOpenItem,
        removeOpenItem: _removeOpenItem,
        setOpenItems: _setOpenItems,
        searchText: _searchText,
        onChangeSearchText: _setSearchText
    }
}