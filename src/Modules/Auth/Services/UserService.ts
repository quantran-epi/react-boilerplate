import { ApiConfig } from "@configs/ApiConfig";
import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IQueryResponse } from "@services/Types";
import { ILoginViewModel } from "../ViewModels/LoginViewModel";

interface ISignInResponseData extends IQueryResponse<{
    token: string;
    type: string;
    user: IUser;
}> { }

export interface IUserService {
    login: (data: ILoginViewModel) => Promise<IUser | null>;
    logout: () => Promise<boolean>;
    isAuthenticated: () => boolean;
    getAuthenticatedUser: () => IUser | null;
}

export class UserService extends BaseService implements IUserService {
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
        let response = await this._helpers.HttpClient.post<ISignInResponseData>(ApiConfig.Auth.Login, data);

        let responseData = response.data.data;

        if (responseData.token) {
            let loggedUser = responseData.user;
            this._setToken(responseData.token);
            this._setUserInfo(loggedUser);
            return loggedUser;
        };

        return null;
    }

    async logout(): Promise<boolean> {
        return this._removeToken() && this._removeUserInfo();
    }
}