import { ApiConfig } from "@configs/ApiConfig";
import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { ILoginViewModel } from "../ViewModels/LoginViewModel";

interface IAuthService {
    login: (data: ILoginViewModel) => Promise<IUser | null>;
    isAuthenticated: () => Promise<boolean>;
}

export class AuthService extends BaseService implements IAuthService {
    _tokenKey: string = "usr_token";
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    private _setToken(token: string): boolean {
        try {
            sessionStorage.setItem(this._tokenKey, token);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private _getToken(): string | null {
        // get token and check token expiration
        return sessionStorage.getItem(this._tokenKey);
    }

    async isAuthenticated(): Promise<boolean> {
        return this._getToken() !== null;
    }

    async login(data: ILoginViewModel): Promise<IUser | null> {
        // fake login 
        return new Promise((res, rej) => {
            setTimeout(() => {
                if (data.username === 'admin' && data.password === 'password') {
                    this._setToken('demo_user');
                    res({});
                }
                else res(null);
            }, 1500)
        })
    }
}