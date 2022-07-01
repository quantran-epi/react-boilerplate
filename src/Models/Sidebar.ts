export interface ISidebarItem {
    label: string;
    href?: string;
    key: string;
    level?: number;
    icon?: React.ReactNode;
    selected?: boolean;
    children?: ISidebarItem[];
    parent?: ISidebarItem;
    parentId?: string;
}