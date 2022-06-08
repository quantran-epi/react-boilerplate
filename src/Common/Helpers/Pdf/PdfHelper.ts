import { IPdfHelper } from "./IPdfHelper";
import { jsPDF } from 'jspdf';

export class PdfHelper implements IPdfHelper {
    saveFromHtml(element: HTMLElement): void {
        let doc = new jsPDF('p', 'pt', 'letter');
        doc.table(0, 0, [
            { column1: "1", column2: "2", column3: '3' },
            { column1: "1", column2: "2", column3: '3' },
            { column1: "1", column2: "2", column3: '3' },
            { column1: "1", column2: "2", column3: '3' },
        ], [
            { name: "column1", prompt: "Column 1", align: "center", padding: 10, width: 50 },
            { name: "column2", prompt: "Column 3", align: "center", padding: 10, width: 50 },
            { name: "column3", prompt: "Column 3", align: "center", padding: 10, width: 50 },
        ], {
            autoSize: true,
        })

        window.open(doc.output('bloburi'));
    }
}