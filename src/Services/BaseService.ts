import { HttpClient } from "@common/Helpers/Http";

interface IBaseService {

}

export interface IServiceHelperCollection {
    HttpClient: HttpClient;
}

export class BaseService implements IBaseService {
    protected _helpers: IServiceHelperCollection;

    constructor(helpers: IServiceHelperCollection) {
        this._helpers = helpers;
    }
}