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
            href: RootRoutes.AuthorizedRoutes.Root,
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
                    // href: RootRoutes.AuthorizedRoutes.CreditRoutes.CreditCardDebtCollectionChecker,
                    children: [
                        {
                            label: "Tạo file thu nợ từ Intellect",
                            key: "1.2.1",
                            href: '222',
                        },
                        {
                            label: "Duyệt file thu nợ từ Intellect",
                            key: "1.2.2",
                            href: "111",
                        },
                    ]
                },
            ]
        },
        // {
        //     label: "Thẻ tín dụng",
        //     key: "2",
        //     children: [
        //         {
        //             label: "Tạo file thu nợ từ Intellect",
        //             key: "2.1",
        //             href: "dadad",
        //         },
        //         {
        //             label: "Duyệt file thu nợ từ Intellect",
        //             key: "2.2",
        //             href: "dawefwfwe",
        //         },
        //     ]
        // }
    ]
}