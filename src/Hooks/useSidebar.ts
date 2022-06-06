import { SidebarConfig } from "@configs/SidebarConfig";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { uniq } from 'lodash';
import { ISidebarItem } from "@models/Sidebar";

interface IUseSidebar {
    sideBarItems: ISidebarItem[];
    selectedItems: string[];
    openItems: string[];
    addOpenItem: (key: string) => void;
    removeOpenItem: (key: string) => void;
    setOpenItems: (keys: string[]) => void;
}

interface IUseSidebarProps {

}

export const useSidebar = (props?: IUseSidebarProps): IUseSidebar => {
    const location = useLocation();
    const [_openItems, _setOpenItems] = useState<string[]>([]);
    const [_sideBarItems, _setSideBarItems] = useState<ISidebarItem[]>(SidebarConfig.items);

    useEffect(() => {
        let selectedItems = _selectedItems();
        _setOpenItems(uniq(_sideBarItems.map(item => getParentOfSelected(item, "", selectedItems)).flat()));
        // _setOpenItems(_sideBarItems.map(item => getParentOfSelected(item, "", selectedItems)).flat());
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

    return {
        sideBarItems: _sideBarItems,
        selectedItems: _selectedItems(),
        openItems: _openItems,
        addOpenItem: _addOpenItem,
        removeOpenItem: _removeOpenItem,
        setOpenItems: _setOpenItems
    }
}