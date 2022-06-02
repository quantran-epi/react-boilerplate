export interface ICreditCardDebtCollectionCheckerSearchViewModel {
    refNo: string;
    bin: string;
    reversal: string;
    fromMakeDate: moment.Moment;
    toMakeDate: moment.Moment;
}