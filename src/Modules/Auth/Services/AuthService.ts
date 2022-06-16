import { ApiConfig } from "@configs/ApiConfig";
import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { ILoginViewModel } from "../ViewModels/LoginViewModel";

interface ISignInResponseData {
    token: string,
    type: string,
    id: string,
    username: string,
    email: string,
    roles: any[]
}

export interface IAuthService {
    login: (data: ILoginViewModel) => Promise<IUser | null>;
    logout: () => Promise<boolean>;
    isAuthenticated: () => boolean;
    getAuthenticatedUser: () => IUser | null;
}

export class AuthService extends BaseService implements IAuthService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    isAuthenticated(): boolean {
        return this._getToken() !== null;
    }

    getAuthenticatedUser(): IUser | null {
        if (this.isAuthenticated()) return this._getUserInfo();
        return null;
    }

    async login(data: ILoginViewModel): Promise<IUser | null> {
        // let response = await this._helpers.HttpClient.post<ISignInResponseData>(ApiConfig.Auth.Login, data);
        let response = {
            data: {
                token: 'fake token',
                username: 'chungps',
                email: '',
                roles: []
            }
        };

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