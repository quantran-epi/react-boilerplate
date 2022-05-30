import { HttpClient } from '@common/Helpers/Http';
import { ApiConfig } from '@configs/ApiConfig';
import { AuthService } from '@modules/Auth/Services/AuthService';
import { IServiceHelperCollection } from './BaseService';

export interface IServiceLocator {
    Auth: AuthService;
}

export function RegisterServices(): IServiceLocator {
    let helpers: IServiceHelperCollection = {
        HttpClient: new HttpClient(ApiConfig.Root)
    }
    let authService = new AuthService(helpers);

    return {
        Auth: authService
    }
}