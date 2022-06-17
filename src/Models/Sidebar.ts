export interface ISidebarItem {
    label: string;
    href?: string;
    key: string;
    level?: number;
    icon?: string;
    selected?: boolean;
    children?: ISidebarItem[];
    parent?: ISidebarItem;
}