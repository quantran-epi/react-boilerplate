import { IDataSet } from "@models/DataSet";

export interface IExcelHelper {
    saveFromTable: (element: HTMLTableElement) => void;
    saveFromDataSet: (dataSet: IDataSet) => void;
}