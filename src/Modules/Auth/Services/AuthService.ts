import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { ILoginViewModel } from "../ViewModels/LoginViewModel";

interface IAuthService {
    login: (data: ILoginViewModel) => Promise<IUser | null>;
    logout: () => Promise<boolean>;
    isAuthenticated: () => boolean;
    getAuthenticatedUser: () => IUser | null;
}

export class AuthService extends BaseService implements IAuthService {
    _tokenKey: string = "usr_token";
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    private _removeToken(): boolean {
        try {
            sessionStorage.removeItem(this._tokenKey);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
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
        // get token and check token expiration, if token expire => return null;
        return sessionStorage.getItem(this._tokenKey);
    }

    private _getUserInfo(): IUser {
        let token = this._getToken();
        // get user info from token;
        return {} as IUser;
    }

    isAuthenticated(): boolean {
        return this._getToken() !== null;
    }

    getAuthenticatedUser(): IUser | null {
        if (this.isAuthenticated()) return this._getUserInfo();
        return null;
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

    async logout(): Promise<boolean> {
        return this._removeToken();
    }
}