import { SidebarConfig } from "@configs/SidebarConfig";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { debounce, flatMapDeep, map, uniq } from 'lodash';
import { ISidebarItem } from "@models/Sidebar";

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
}

export const useSidebar = (props?: IUseSidebarProps): IUseSidebar => {

    const _transformSidebarItems = (items: ISidebarItem[], parent?: ISidebarItem): ISidebarItem[] => {
        return items.map(item => {
            return { ...item, parent: parent, children: _transformSidebarItems(item.children || [], item) };
        })
    }

    const location = useLocation();
    const [_openItems, _setOpenItems] = useState<string[]>([]);
    const [_sideBarItems, _setSideBarItems] = useState<ISidebarItem[]>(_transformSidebarItems(SidebarConfig.items, undefined));
    const [_searchText, _setSearchText] = useState<string>("");

    useEffect(() => {
        let selectedItems = _selectedItems();
        _setOpenItems(uniq(_sideBarItems.map(item => getParentOfSelected(item, "", selectedItems)).flat()));
    }, [location])

    const getParentOfSelected = (item: ISidebarItem, parent: string, selectedItems: string[]): string[] => {
        if (selectedItems.includes(item.key)) return [parent];
        let values = item.children?.map(e => getParentOfSelected(e, item.key, selectedItems)).flat();
        if (values && values?.length > 0) return [item.key, ...values];
        return [];
    }

    const _selectedItems = (): string[] => {
        return _sideBarItems.map(item => _getSelected(item)).flat();
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
            if (el.children) {
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
        return flattenedItems.filter(item => _isMatch(item.label));
    }

    return {
        sideBarItems: _filteredSidebarItems(),
        selectedItems: _selectedItems(),
        openItems: _openItems,
        addOpenItem: _addOpenItem,
        removeOpenItem: _removeOpenItem,
        setOpenItems: _setOpenItems,
        searchText: _searchText,
        onChangeSearchText: _setSearchText
    }
}