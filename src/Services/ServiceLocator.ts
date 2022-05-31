import { HttpClient } from '@common/Helpers/Http';
import { ApiConfig } from '@configs/ApiConfig';
import { AuthService } from '@modules/Auth/Services/AuthService';
import { CreditCardDebtCollectionService } from '@modules/Function/Credit/Services/CreditCardDebtCollectionService';
import { IServiceHelperCollection } from './BaseService';

export interface IServiceLocator {
    Auth: AuthService;
    Function: {
        Credit: {
            CreditCardDebtCollection: CreditCardDebtCollectionService
        }
    }
}

export function RegisterServices(): IServiceLocator {
    let helpers: IServiceHelperCollection = {
        HttpClient: new HttpClient(ApiConfig.Root)
    }
    let authService = new AuthService(helpers);
    let creditCardDebtCollectionService = new CreditCardDebtCollectionService(helpers);

    return {
        Auth: authService,
        Function: {
            Credit: {
                CreditCardDebtCollection: creditCardDebtCollectionService
            }
        }
    }
}