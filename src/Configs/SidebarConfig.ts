import { RootRoutes } from "@routing/RootRoutes";

export interface ISidebarItem {
    label: string;
    href?: string;
    key: string;
    icon?: string;
    selected?: boolean;
    children?: ISidebarItem[];
}

interface ISidebarConfig {
    items: ISidebarItem[];
}

export const SidebarConfig: ISidebarConfig = {
    items: [
        {
            label: "Tạo file thu nợ từ Intellect",
            key: "1",
            href: RootRoutes.CreditRoutes.CreditCardDebtCollectionMaker,
        },
        {
            label: "Duyệt file thu nợ từ Intellect",
            key: "2",
            href: RootRoutes.CreditRoutes.CreditCardDebtCollectionChecker,
        },
        {
            label: "Item 1",
            key: "3",
            children: [
                {
                    label: "Sub Item 1",
                    key: "4",
                    href: RootRoutes.HomeRoutes.Dashboard,
                },
                {
                    label: "Sub Item 2",
                    key: "5",
                    href: RootRoutes.AuthRoutes.Login,
                }
            ]
        }
    ]
}