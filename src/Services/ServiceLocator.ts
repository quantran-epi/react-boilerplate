import { HttpClient } from '@common/Helpers/Http';
import { ApiConfig } from '@configs/ApiConfig';
import { UserService } from '@modules/User/Services/UserService';
import { MenuService } from '@modules/Auth/Services/MenuService';
import { RoleService } from '@modules/Auth/Services/RoleService';
import { CreditCardDebtCollectionService } from '@modules/Credit/Services/CreditCardDebtCollectionService';
import { IServiceHelperCollection } from './BaseService';
import { SignInService } from '@modules/Auth/Services/SignInService';

export interface IServiceLocator {
    Auth: {
        SignIn: SignInService,
        Menu: MenuService,
        Role: RoleService
    };
    User: UserService,
    Credit: {
        CreditCardDebtCollection: CreditCardDebtCollectionService
    },
}

export function RegisterServices(): IServiceLocator {
    let helpers: IServiceHelperCollection = {
        HttpClient: new HttpClient(ApiConfig.Root)
    }
    let signInService = new SignInService(helpers);
    let menuService = new MenuService(helpers);
    let roleService = new RoleService(helpers);

    let userService = new UserService(helpers);

    let creditCardDebtCollectionService = new CreditCardDebtCollectionService(helpers);

    return {
        Auth: {
            SignIn: signInService,
            Menu: menuService,
            Role: roleService
        },
        User: userService,
        Credit: {
            CreditCardDebtCollection: creditCardDebtCollectionService
        }
    }
}