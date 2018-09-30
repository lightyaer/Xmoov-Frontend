import { Receipt } from './../../models/common';
import { ReceiptProvider } from './../../services/receipts.service';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';
import { SalesOrder } from './../../models/salesOrder';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-receipts',
  templateUrl: 'receipts.html',
})
export class ReceiptsPage {

  salesOrder: SalesOrder;
  title: string;
  currentLang: string;
  pdfObj: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private viewCtrl: ViewController,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener,
    private receiptService: ReceiptProvider
  ) {
    this.salesOrder = this.navParams.get('salesOrder');
    this.title = this.translate.instant('RECEIPT');
    this.currentLang = this.translate.getDefaultLang();
    this.constructReceiptDoc();
  }

  generateTableBody() {
    let body = [];
    body.push([{ text: 'Products', style: 'subheader' }, { text: 'Quantity', style: 'subheader' }, { text: 'Price', style: 'subheader' }, { text: 'Total', style: 'subheader' }]);
    this.salesOrder.products.map(item => {
      body.push([item.nameEn, item.quantity.toString(), item.price.toString(), (+item.price * item.quantity).toFixed(2).toString()])
    });
    body.push([' ', ' ', { text: 'Subtotal', style: 'subheader' }, this.salesOrder.total.toString()]);
    body.push([' ', ' ', { text: 'Commission', style: 'subheader' }, this.salesOrder.commission.toString()]);
    body.push([' ', ' ', { text: 'Discount', style: 'subheader' }, this.salesOrder.discount.toString()]);
    body.push([' ', ' ', { text: 'Handling', style: 'subheader' }, this.salesOrder.handling.toString()]);
    body.push([' ', ' ', { text: 'Tax %', style: 'subheader' }, this.salesOrder.tax.toString()]);
    body.push([' ', ' ', { text: 'Grand Total', style: 'subheader' }, this.salesOrder.grandTotal.toString()]);
    return body;
  }

  async saveReceipt(receiptNo, createdDate) {

    try {
      let receipt: Receipt = {
        _receipt: receiptNo,
        _salesOrder: this.salesOrder._id,
        date: createdDate
      }
      await this.receiptService.saveReceipt(receipt);
    } catch (error) {

    }

  }

  constructReceiptDoc() {
    let receiptNo = (new Date().valueOf() + (Math.random() * 10000 + 1).toFixed(0)).toString();
    let createdDate = new Date().toISOString();
    this.saveReceipt(receiptNo, createdDate);
    let docDef = {
      content: [
        { text: 'XMOOV', style: 'header' },
        { text: 'Receipt No. ' + receiptNo },
        {
          style: 'tableExample',
          table: {
            widths: ['50%', '15%', '20%', '15%'],
            body: this.generateTableBody(),
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
          alignment: 'center'
        },
        subheader: {
          fontSize: 13,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        }
      },
      defaultStyle: {
        alignment: 'justify'
      }
    }
    this.pdfObj = pdfMake.createPdf(docDef);
  }

  downloadPdf() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'receipt.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObj.download();
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
