import { IExcelHelper } from './IExcelHelper';
import { utils, writeFile } from 'xlsx';

export class ExcelHelper implements IExcelHelper {
    saveFromTable(element: HTMLTableElement): void {
        let workbook = utils.table_to_book(element);
        writeFile(workbook, "Report.xlsx");
    }
}