import { ApiConfig } from "@configs/ApiConfig";
import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { ILoginViewModel } from "../ViewModels/LoginViewModel";
import jwt_decode from "jwt-decode";

interface ISignInResponseData {
    token: string,
    type: string,
    id: string,
    username: string,
    email: string,
    roles: any[]
}

interface IAuthService {
    login: (data: ILoginViewModel) => Promise<IUser | null>;
    logout: () => Promise<boolean>;
    isAuthenticated: () => boolean;
    getAuthenticatedUser: () => IUser | null;
}

export class AuthService extends BaseService implements IAuthService {
    _tokenKey: string = "usr_token";
    _userInfoKey: string = "usr_info";

    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    private _removeUserInfo(): boolean {
        try {
            sessionStorage.removeItem(this._userInfoKey);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    private _setUserInfo(info: IUser): boolean {
        try {
            sessionStorage.setItem(this._userInfoKey, JSON.stringify(info));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
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

    private _getUserInfo(): IUser | null {
        let savedUser = sessionStorage.getItem(this._userInfoKey);
        return savedUser ? JSON.parse(savedUser) : null;
    }

    isAuthenticated(): boolean {
        return this._getToken() !== null;
    }

    getAuthenticatedUser(): IUser | null {
        if (this.isAuthenticated()) return this._getUserInfo();
        return null;
    }

    async login(data: ILoginViewModel): Promise<IUser | null> {
        let response = await this._helpers.HttpClient.post<ISignInResponseData>(ApiConfig.Auth.Login, data);

        if (response.data.token) {
            let loggedUser: IUser = {
                username: response.data.username,
                email: response.data.email,
                roles: response.data.roles
            }
            this._setToken(response.data.token);
            this._setUserInfo(loggedUser);
            return loggedUser;
        };

        return null;
    }

    async logout(): Promise<boolean> {
        return this._removeToken() && this._removeUserInfo();
    }
}