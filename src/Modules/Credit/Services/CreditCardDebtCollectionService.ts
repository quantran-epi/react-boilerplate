import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { IPaginateQueryResponse } from '@services/Types';
import { ICreditCardDebtCollectionCheckerSearchViewModel } from '../ViewModels/ICreditCardDebtCollectionCheckerViewModel';
import { ICreditCardDebtCollectionMakerSearchViewModel } from "../ViewModels/ICreditCardDebtCollectionMakerViewModel";

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
                    message: "Success",
                    data: new Array(10).fill(1).map((e, i) => ({
                        key: i,
                        column1: 'Row ' + (i + counter),
                        column2: 'Row ' + (i + counter),
                        column3: 'Row ' + (i + counter),
                        column4: 'Row ' + (i + counter),
                        column5: 'Row ' + (i + counter),
                    })),
                    status: 200,
                    pageable: {
                        page: page,
                        size: 10,
                        total: 100
                    }
                })
            }, 500)
        })
    }

    searchChecker(params: ICreditCardDebtCollectionCheckerSearchViewModel, page: number): Promise<IPaginateQueryResponse<any[]>> {
        return new Promise((res, rej) => {
            let counter = (page - 1) * 10;
            setTimeout(() => {
                res({
                    message: "Success",
                    data: new Array(10).fill(1).map((e, i) => ({
                        key: i,
                        column1: 'Row ' + (i + counter),
                        column2: 'Row ' + (i + counter),
                        column3: 'Row ' + (i + counter),
                        column4: 'Row ' + (i + counter),
                        column5: 'Row ' + (i + counter),
                    })),
                    status: 200,
                    pageable: {
                        page: page,
                        size: 10,
                        total: 100
                    }
                })
            }, 500)
        })
    }

}