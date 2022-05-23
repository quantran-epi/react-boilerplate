import { ApiConfig } from '@configs/ApiConfig';
import { HttpClient } from '@helpers/Http';
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