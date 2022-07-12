import { ApiConfig } from "@configs/ApiConfig";
import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IMutationResponse, IPaginateQueryParams, IPaginateQueryResponse, IQueryResponse } from "@services/Types";

interface IUserFilterQueryParams extends IPaginateQueryParams {
    username?: string;
    fullname?: string;
}

interface IUserCreateParams {
    username: string;
    fullname: string;
}

export interface IUserService {
    filter: (params: IUserFilterQueryParams) => Promise<IPaginateQueryResponse<IUser[]>>;
    getById: (id: number) => Promise<IQueryResponse<IUser>>;
    create: (params: IUserCreateParams) => Promise<IMutationResponse<IUser>>;
    delete: (id: number) => Promise<IMutationResponse>;
}

export class UserService extends BaseService implements IUserService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    async filter(params: IUserFilterQueryParams): Promise<IPaginateQueryResponse<IUser[]>> {
        let response = await this._helpers.HttpClient.get<IPaginateQueryResponse<IUser[]>>(ApiConfig.Authorized.User, {
            params: params,
            headers: this._getRequestHeader()
        });
        return response.data;
    }

    async getById(id: number): Promise<IQueryResponse<IUser>> {
        let response = await this._helpers.HttpClient.get<IQueryResponse<IUser>>(ApiConfig.Authorized.User.concat('/').concat(id.toString()), {
            headers: this._getRequestHeader()
        });
        return response.data;
    }

    async create(params: IUserCreateParams): Promise<IQueryResponse<IUser>> {
        let response = await this._helpers.HttpClient.post<IQueryResponse<IUser>>(ApiConfig.Authorized.User, params, {
            headers: this._getRequestHeader()
        });
        return response.data;
    }

    async delete(id: number): Promise<IMutationResponse<undefined>> {
        let response = await this._helpers.HttpClient.post<IMutationResponse<undefined>>(ApiConfig.Authorized.UserDelete.concat('/').concat(id.toString()), {}, {
            headers: this._getRequestHeader()
        });
        return response.data;
    }

}

export type {
    IUserFilterQueryParams
}