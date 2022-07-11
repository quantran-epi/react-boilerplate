import { ApiConfig } from "@configs/ApiConfig";
import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IPaginateQueryParams, IPaginateQueryResponse } from "@services/Types";

interface IUserFilterQueryParams extends IPaginateQueryParams {
    username?: string;
    fullname?: string;
}

export interface IUserService {
    filter: (params: IUserFilterQueryParams) => Promise<IPaginateQueryResponse<IUser>>;
}

export class UserService extends BaseService implements IUserService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    async filter(params: IUserFilterQueryParams): Promise<IPaginateQueryResponse<IUser>> {
        let response = await this._helpers.HttpClient.get<IPaginateQueryResponse<IUser>>(ApiConfig.Auth.User, {
            params: params
        });
        return response.data;
    }
}