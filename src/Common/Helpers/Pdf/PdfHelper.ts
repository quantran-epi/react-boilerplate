import { IPdfHelper } from "./IPdfHelper";
import { CellConfig, jsPDF } from 'jspdf';
import { IDataSet } from "@models/DataSet";

export class PdfHelper implements IPdfHelper {
    saveFromHtml(element: HTMLElement): void {

    }

    saveFromDataSet(dataSet: IDataSet): void {
        let doc = new jsPDF('p', 'pt', 'letter');
        doc.table(0, 0, dataSet.rows, dataSet.columns.map<CellConfig>(e => ({
            name: e.key,
            prompt: e.label,
            width: 0,
            padding: 10,
            align: "center"
        })), {
            autoSize: true,
        })

        window.open(doc.output('bloburi'));
    }
}