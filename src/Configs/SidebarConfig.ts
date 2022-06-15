import { ISidebarItem } from "@models/Sidebar";
import { RootRoutes } from "@routing/RootRoutes";

interface ISidebarConfig {
    items: ISidebarItem[];
}

export const SidebarConfig: ISidebarConfig = {
    items: [
        {
            key: '0',
            label: "Home",
            href: RootRoutes.AuthorizedRoutes.Root
        },
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