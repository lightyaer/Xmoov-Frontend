import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Product } from '../../models/product';
import { TranslateService } from '@ngx-translate/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { PurchaseOrderProvider } from '../../services/purchaseOrder.service';
import { Quantities } from '../../models/common';

@Component({
  selector: 'page-config-product',
  templateUrl: 'config-product.html',
})
export class ConfigProductPage {
  products: Product[];
  quantities: number[] = [];
  quantitiesRemainder: Quantities[];
  salesOrder_id: string;
  alertProducts = [];
  lang: string;
  fromPurchaseOrder: boolean = false;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private viewCtrl: ViewController,
    private alertCtrl: AlertController,
    private purchaseOrderService: PurchaseOrderProvider
  ) {

    this.fromPurchaseOrder = this.navParams.get('fromPO');
    this.lang = this.translate.getDefaultLang();
    this.salesOrder_id = this.navParams.get('salesOrder_id');
    this.products = this.navParams.get('products');
    this.setQuantities();
  }


  async setQuantities() {
    if (this.fromPurchaseOrder) {
      this.quantitiesRemainder = await this.purchaseOrderService.getRemainderQuantities(this.salesOrder_id) as Quantities[];
      if (this.quantitiesRemainder.length > 0) {
        this.products.map(prod => {
          let quant: Quantities = this.quantitiesRemainder.find(item => item._product === prod._id);
          quant = quant ? quant : { quantity: prod.quantity, _product: prod._id, _id: '0' }
          prod.quantity = quant.quantity;
          this.quantities.push(quant.quantity);
        })
      } else {
        this.products.map(item => {
          this.quantities.push(item.quantity);
        });
      }
    }
  }

  dismiss() {
    if (this.validate()) {
      this.products = this.products.filter(prod => prod.quantity > 0);
      this.viewCtrl.dismiss(this.products);

    }

  }

  validate() {
    if (this.fromPurchaseOrder) {
      this.alertProducts = [];
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
