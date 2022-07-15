import { ApiConfig } from "@configs/ApiConfig";
import { IRole } from "@models/Role";
import { RootRoutes } from "@routing/RootRoutes";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IMutationResponse, IQueryResponse } from "@services/Types";

interface IFilterRoleResponseData extends IQueryResponse<IRole[]> {

}

export interface IRoleService {
    isAuthorized: (location: string) => boolean;
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

    private _isAnonymousRoutes = (location: string): boolean => {
        return location === RootRoutes.AuthRoutes.Root || location === RootRoutes.AuthRoutes.Login();
    }

    private _isStaticRoutes = (location: string): boolean => {
        return location === RootRoutes.StaticRoutes.Error
            || location === RootRoutes.StaticRoutes.NotFound;
    }

    isAuthorized(location: string): boolean {
        let user = this._getUserInfo();
        if (!user) return false;

        if (this._isAnonymousRoutes(location)
            || location === RootRoutes.AuthorizedRoutes.Root
            || this._isStaticRoutes(location)) return true;

        let locationWithoutQueryString = location.substring(location.lastIndexOf('?'));
        return user?.roles.some(role => role.menu.map(m => m.link).includes(locationWithoutQueryString)) || false;
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