import { ApiConfig } from "@configs/ApiConfig";
import { IRole } from "@models/Role";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IMutationResponse, IQueryResponse } from "@services/Types";

interface IFilterRoleResponseData extends IQueryResponse<IRole[]> {

}

export interface IRoleService {
    filter: () => Promise<IRole[]>;
    create: (param: Omit<IRole, "id">) => Promise<IMutationResponse<IRole>>;
    update: (param: Omit<IRole, "id">) => Promise<IMutationResponse<IRole>>;
    getById: (id: number) => Promise<IQueryResponse<IRole>>;
    delete: (id: number) => Promise<IMutationResponse>;
}

export class RoleService extends BaseService implements IRoleService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    async filter(): Promise<IRole[]> {
        let response = await this._helpers.HttpClient.get<IFilterRoleResponseData>(ApiConfig.Authorized.Role, {
            headers: this._getRequestHeader()
        });

        return response.data.data;
    }

    async create(param: Omit<IRole, "id">): Promise<IMutationResponse<IRole>> {
        let response = await this._helpers.HttpClient.post<IMutationResponse<IRole>>(ApiConfig.Authorized.Role, param, {
            headers: this._getRequestHeader()
        })
        return response.data;
    }

    async update(param: Omit<IRole, "id">): Promise<IMutationResponse<IRole>> {
        let response = await this._helpers.HttpClient.post<IMutationResponse<IRole>>(ApiConfig.Authorized.Role, param, {
            headers: this._getRequestHeader()
        })
        return response.data;
    }

    async getById(id: number): Promise<IQueryResponse<IRole>> {
        let response = await this._helpers.HttpClient.get<IQueryResponse<IRole>>(ApiConfig.Authorized.Role.concat('/').concat(id.toString()), {
            headers: this._getRequestHeader()
        })
        return response.data;
    }

    async delete(id: number): Promise<IMutationResponse<undefined>> {
        let response = await this._helpers.HttpClient.post<IMutationResponse>(ApiConfig.Authorized.RoleDelete.concat('/').concat(id.toString()), {}, {
            headers: this._getRequestHeader()
        })
        return response.data;
    }
}