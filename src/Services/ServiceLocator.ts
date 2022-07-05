import { HttpClient } from '@common/Helpers/Http';
import { ApiConfig } from '@configs/ApiConfig';
import { UserService } from '@modules/Auth/Services/UserService';
import { MenuService } from '@modules/Auth/Services/MenuService';
import { RoleService } from '@modules/Auth/Services/RoleService';
import { CreditCardDebtCollectionService } from '@modules/Credit/Services/CreditCardDebtCollectionService';
import { IServiceHelperCollection } from './BaseService';

export interface IServiceLocator {
    Auth: {
        User: UserService,
        Menu: MenuService,
        Role: RoleService
    };
    Credit: {
        CreditCardDebtCollection: CreditCardDebtCollectionService
    },
}

export function RegisterServices(): IServiceLocator {
    let helpers: IServiceHelperCollection = {
        HttpClient: new HttpClient(ApiConfig.Root)
    }
    let userService = new UserService(helpers);
    let menuService = new MenuService(helpers);
    let roleService = new RoleService(helpers);

    let creditCardDebtCollectionService = new CreditCardDebtCollectionService(helpers);

    return {
        Auth: {
            User: userService,
            Menu: menuService,
            Role: roleService
        },
        Credit: {
            CreditCardDebtCollection: creditCardDebtCollectionService
        }
    }
}