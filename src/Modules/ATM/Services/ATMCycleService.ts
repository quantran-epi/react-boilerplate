import { ApiConfig } from "@configs/ApiConfig";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IQueryResponse } from "@services/Types";
import { IATMCycle } from "../Models/ATMCycle";
import { IUpdateATMCycleMakerSearchViewModel } from "../ViewModels/UpdateATMCycleMakerSearchViewModel";

export interface IATMCycleService {
    search: (params: IUpdateATMCycleMakerSearchViewModel) => Promise<IQueryResponse<IATMCycle>>;
}

export class ATMCycleService extends BaseService implements IATMCycleService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    async search(params: IUpdateATMCycleMakerSearchViewModel): Promise<IQueryResponse<IATMCycle>> {
        let response = await this._helpers.HttpClient.post<IQueryResponse<IATMCycle>>(ApiConfig.Authorized.ATM.ATMCyle.Search, params, {
            headers: this._getRequestHeader()
        })

        return response.data;
    }
}