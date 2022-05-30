import { useLocation } from 'react-router-dom';
import { ISidebarItem, SidebarConfig } from "@configs/SidebarConfig"
import { useMemo } from "react";

interface IUseSidebar {
    sideBarItems: ISidebarItem[];
}

interface IUseSidebarProps {

}

export const useSidebar = (props?: IUseSidebarProps): IUseSidebar => {
    const location = useLocation();

    const sideBarItems = useMemo<ISidebarItem[]>(() => {
        return SidebarConfig.items.map(e => ({
            ...e,
            selected: location.pathname === e.href
        }))
    }, [location])

    return {
        sideBarItems: sideBarItems
    }
}