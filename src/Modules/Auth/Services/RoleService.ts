import { ApiConfig } from "@configs/ApiConfig";
import { IRole } from "@models/Role";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IQueryResponse } from "@services/Types";

interface IFilterRoleResponseData extends IQueryResponse<IRole[]> {

}

export interface IRoleService {
    filter: () => Promise<IRole[]>;
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
}