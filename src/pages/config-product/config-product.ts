import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
import { TranslateService } from '@ngx-translate/core';
import { ViewController } from 'ionic-angular/navigation/view-controller';

@Component({
  selector: 'page-config-product',
  templateUrl: 'config-product.html',
})
export class ConfigProductPage {
  products: Product[];
  lang: string;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private translate: TranslateService,
    private viewCtrl: ViewController
  ) {
    this.lang = this.translate.getDefaultLang();
    this.products = this.navParams.get('products');
  }

  dismiss() {
    this.viewCtrl.dismiss(this.products);
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
