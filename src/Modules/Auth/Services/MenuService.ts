import { ApiConfig } from "@configs/ApiConfig";
import { IServerMenuItem } from "@models/Server/ServerMenuItem";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IQueryResponse } from "@services/Types";

interface IFilterMenuResponseData extends IQueryResponse<IServerMenuItem[]> {

}

export interface IMenuService {
    filter: () => Promise<IServerMenuItem[]>;
}

export class MenuService extends BaseService implements IMenuService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    async filter(): Promise<IServerMenuItem[]> {
        let response = await this._helpers.HttpClient.get<IFilterMenuResponseData>(ApiConfig.Authorized.Menu, {
            headers: this._getRequestHeader()
        });

        return response.data.data;
    }
}