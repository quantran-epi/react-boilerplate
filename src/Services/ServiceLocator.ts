import { HttpClient } from '@common/Helpers/Http';
import { ApiConfig } from '@configs/ApiConfig';
import { UserService } from '@modules/User/Services/UserService';
import { CreditCardDebtCollectionService } from '@modules/Credit/Services/CreditCardDebtCollectionService';
import { IServiceHelperCollection } from './BaseService';
import { SignInService } from '@modules/Auth/Services/SignInService';
import { MenuService } from '@modules/Permission/Services/MenuService';
import { RoleService } from '@modules/Permission/Services/RoleService';
import { ATMCycleService } from '@modules/ATM/Services/ATMCycleService';

export interface IServiceLocator {
    Auth: {
        SignIn: SignInService,
    };
    Permission: {
        Menu: MenuService,
        Role: RoleService
    }
    User: UserService,
    Credit: {
        CreditCardDebtCollection: CreditCardDebtCollectionService
    },
    ATM: {
        ATMCycle: ATMCycleService
    }
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

    let atmCycleServices = new ATMCycleService(helpers);

    return {
        Auth: {
            SignIn: signInService,
        },
        Permission: {
            Menu: menuService,
            Role: roleService
        },
        User: userService,
        Credit: {
            CreditCardDebtCollection: creditCardDebtCollectionService
        },
        ATM: {
            ATMCycle: atmCycleServices
        }
    }
}