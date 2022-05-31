export interface ICreditCardDebtCollectionMakerSearchViewModel {
    refNo: string;
    bin: string;
    reversal: string;
    fromTxnDate: moment.Moment;
    toTxnDate: moment.Moment;
}