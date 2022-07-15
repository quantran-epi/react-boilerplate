import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IQueryResponse } from "@services/Types";

export interface IATMCycleService {
}

export class ATMCycleService extends BaseService implements IATMCycleService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }
}