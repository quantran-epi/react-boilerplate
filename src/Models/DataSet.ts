interface IDataSetRow {
    [key: string]: string;
}

interface IDataSetColumn {
    key: string;
    label: string;
}

export interface IDataSet {
    rows: IDataSetRow[];
    columns: IDataSetColumn[];
}