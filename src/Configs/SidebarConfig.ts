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
            label: "Thẻ tín dụng",
            key: "1",
            children: [
                {
                    label: "Tạo file thu nợ từ Intellect",
                    key: "1.1",
                    href: RootRoutes.AuthorizedRoutes.CreditRoutes.CreditCardDebtCollectionMaker,
                },
                {
                    label: "Duyệt file thu nợ từ Intellect",
                    key: "1.2",
                    href: RootRoutes.AuthorizedRoutes.CreditRoutes.CreditCardDebtCollectionChecker,
                },
            ]
        }
    ]
}