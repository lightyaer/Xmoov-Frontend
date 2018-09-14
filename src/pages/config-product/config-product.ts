import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from '../../models/product';
import { TranslateService } from '@ngx-translate/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { SalesOrder } from '../../models/salesOrder';
import { SalesOrderProvider } from '../../services/salesOrder.service';

@Component({
  selector: 'page-config-product',
  templateUrl: 'config-product.html',
})
export class ConfigProductPage {
  products: Product[];
  quantities: number[] = [];
  quantitiesRemainder: number[] = [];
  salesOrder: SalesOrder;
  alertProducts = [];
  lang: string;
  fromPurchaseOrder: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private salesOrderService: SalesOrderProvider
  ) {

    this.fromPurchaseOrder = this.navParams.get('fromPO');
    this.lang = this.translate.getDefaultLang();
    this.salesOrder = this.navParams.get("salesOrder");
    this.salesOrderService.getSalesOrderByID(this.salesOrder._id).then((res: SalesOrder) => {
      this.salesOrder = res;
    });
    this.products = this.navParams.get('products');
    this.products.map(item => {
      this.quantities.push(item.quantity);
    })
  }

  dismiss() {
    if (this.validate())
      this.viewCtrl.dismiss(this.products);
  }

  validate() {
    if (this.fromPurchaseOrder) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].quantity > this.quantities[i]) {
          this.products[i].quantity = this.quantities[i];
          this.alertProducts.push({ nameEn: this.products[i].nameEn, nameAr: this.products[i].nameAr })
        }
      }
      if (this.alertProducts.length > 0) {

        let str = this.alertProducts.map(prod => {
          if (this.lang == 'en') {
            return prod.nameEn + ' '
          } else {
            return prod.nameAr + ' '
          }
        })
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: `Quantities of these products are more than the Sales Order: ${str}.`,
          buttons: ['Ok']
        })
        alert.present();
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
