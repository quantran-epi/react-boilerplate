export interface ISidebarItem {
    label: string;
    href?: string;
    key: string;
    icon?: string;
    selected?: boolean;
    children?: ISidebarItem[];
}