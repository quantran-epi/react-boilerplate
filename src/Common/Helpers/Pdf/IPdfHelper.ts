import { IDataSet } from "@models/DataSet";

export interface IPdfHelper {
    saveFromHtml: (element: HTMLElement) => void;
    saveFromDataSet: (dataSet: IDataSet) => void;
}