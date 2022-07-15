import { ICreditCardDebtCollectionCheckerSearchViewModel } from "@modules/Credit/ViewModels/ICreditCardDebtCollectionCheckerViewModel";
import { ICreditCardDebtCollectionMakerSearchViewModel } from "@modules/Credit/ViewModels/ICreditCardDebtCollectionMakerViewModel";

const CreditKeys = {
    All: () => ['credit'],
    CreditCardDebtCollection: {
        All: () => [...CreditKeys.All(), 'CreditCardDebtCollection'],
        Checker: (searchViewModel: ICreditCardDebtCollectionCheckerSearchViewModel, page: number) =>
            [...CreditKeys.CreditCardDebtCollection.All(), 'Checker', searchViewModel, page],
        Maker: (searchViewModel: ICreditCardDebtCollectionMakerSearchViewModel, page: number) =>
            [...CreditKeys.CreditCardDebtCollection.All(), 'Maker', searchViewModel, page],
    }
}

export default CreditKeys