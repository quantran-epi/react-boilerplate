import { IExcelHelper } from './IExcelHelper';
import { utils, writeFile } from 'xlsx';
import { IDataSet } from '@models/DataSet';

export class ExcelHelper implements IExcelHelper {
    saveFromTable(element: HTMLTableElement): void {
        let workbook = utils.table_to_book(element);
        writeFile(workbook, "Report.xlsx");
    }

    saveFromDataSet(dataSet: IDataSet): void {
        debugger
        let workbook = utils.book_new();
        let worksheet = utils.json_to_sheet(dataSet.rows);
        utils.book_append_sheet(workbook, worksheet);

        writeFile(workbook, "Report.xlsx");
    }
}