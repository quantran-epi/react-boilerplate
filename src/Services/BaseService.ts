import { HttpClient } from "@common/Helpers/Http";
import { IUser } from "@models/User";
import { AxiosRequestHeaders } from "axios";

interface IBaseService {

}

export interface IServiceHelperCollection {
    HttpClient: HttpClient;
}

export class BaseService implements IBaseService {
    _tokenKey: string = "usr_token";
    _userInfoKey: string = "usr_info";
    protected _helpers: IServiceHelperCollection;


    constructor(helpers: IServiceHelperCollection) {
        this._helpers = helpers;
    }

    protected _removeUserInfo(): boolean {
        try {
            sessionStorage.removeItem(this._userInfoKey);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    protected _setUserInfo(info: IUser): boolean {
        try {
            sessionStorage.setItem(this._userInfoKey, JSON.stringify(info));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    protected _removeToken(): boolean {
        try {
            sessionStorage.removeItem(this._tokenKey);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    protected _setToken(token: string): boolean {
        try {
            sessionStorage.setItem(this._tokenKey, token);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    protected _getToken(): string | null {
        // get token and check token expiration, if token expire => return null;
        return sessionStorage.getItem(this._tokenKey);
    }

    protected _getUserInfo(): IUser | null {
        let savedUser = sessionStorage.getItem(this._userInfoKey);
        return savedUser ? JSON.parse(savedUser) : null;
    }

    protected _getRequestHeader(): AxiosRequestHeaders {
        let headers: AxiosRequestHeaders = {};

        let token = this._getToken();
        if (token) headers["Authorization"] = "Bearer ".concat(token);
        return headers;
    }
}