import { HttpClient } from '@common/Helpers/Http';
import { ApiConfig } from '@configs/ApiConfig';
import { AuthService } from '@modules/Auth/Services/AuthService';
import { MenuService } from '@modules/Auth/Services/MenuService';
import { CreditCardDebtCollectionService } from '@modules/Credit/Services/CreditCardDebtCollectionService';
import { IServiceHelperCollection } from './BaseService';

export interface IServiceLocator {
    Auth: {
        Authentication: AuthService,
        Menu: MenuService
    };
    Credit: {
        CreditCardDebtCollection: CreditCardDebtCollectionService
    },
}

export function RegisterServices(): IServiceLocator {
    let helpers: IServiceHelperCollection = {
        HttpClient: new HttpClient(ApiConfig.Root)
    }
    let authService = new AuthService(helpers);
    let menuService = new MenuService(helpers);

    let creditCardDebtCollectionService = new CreditCardDebtCollectionService(helpers);

    return {
        Auth: {
            Authentication: authService,
            Menu: menuService
        },
        Credit: {
            CreditCardDebtCollection: creditCardDebtCollectionService
        }
    }
}