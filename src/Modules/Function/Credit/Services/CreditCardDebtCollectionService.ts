import { ICreditCardDebtCollectionCheckerSearchViewModel } from '../ViewModels/ICreditCardDebtCollectionCheckerViewModel';
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { ICreditCardDebtCollectionMakerSearchViewModel } from "../ViewModels/ICreditCardDebtCollectionMakerViewModel";
import { IPaginateQueryResponse } from '@services/Types';

interface ICreditCardDebtCollectionService {
    searchMaker: (params: ICreditCardDebtCollectionMakerSearchViewModel, page: number) => Promise<IPaginateQueryResponse<any[]>>;
    searchChecker: (params: ICreditCardDebtCollectionCheckerSearchViewModel, page: number) => Promise<IPaginateQueryResponse<any[]>>;
}

export class CreditCardDebtCollectionService extends BaseService implements ICreditCardDebtCollectionService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    searchMaker(params: ICreditCardDebtCollectionMakerSearchViewModel, page: number): Promise<IPaginateQueryResponse<any[]>> {
        return new Promise((res, rej) => {
            let counter = (page - 1) * 10;
            setTimeout(() => {
                res({
                    data: new Array(10).fill(1).map((e, i) => ({
                        key: i,
                        column1: 'Row ' + (i + counter),
                        column2: 'Row ' + (i + counter),
                        column3: 'Row ' + (i + counter),
                        column4: 'Row ' + (i + counter),
                        column5: 'Row ' + (i + counter),
                    })),
                    page: page,
                    pageSize: 10,
                    status: 200,
                    totalItems: 100
                })
            }, 1500)
        })
    }

    searchChecker(params: ICreditCardDebtCollectionCheckerSearchViewModel, page: number): Promise<IPaginateQueryResponse<any[]>> {
        return new Promise((res, rej) => {
            let counter = (page - 1) * 10;
            setTimeout(() => {
                res({
                    data: new Array(10).fill(1).map((e, i) => ({
                        key: i,
                        column1: 'Row ' + (i + counter),
                        column2: 'Row ' + (i + counter),
                        column3: 'Row ' + (i + counter),
                        column4: 'Row ' + (i + counter),
                        column5: 'Row ' + (i + counter),
                    })),
                    page: page,
                    pageSize: 10,
                    status: 200,
                    totalItems: 100
                })
            }, 1500)
        })
    }

}