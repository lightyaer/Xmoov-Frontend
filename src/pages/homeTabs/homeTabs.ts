import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { SalesOrdersPage } from '../salesOrders/salesOrders';
import { RetailersPage } from '../retailers/retailers';
import { PurchaseOrdersPage } from '../purchaseOrders/purchaseOrders';
import { TranslateService } from '@ngx-translate/core';


@Component({
    selector: 'page-homeTabs',
    templateUrl: 'homeTabs.html'
})
export class HomeTabsPage {

    PurchaseOrders: any = PurchaseOrdersPage;
    SalesOrders: any = SalesOrdersPage;
    Retailers: any = RetailersPage;
    navData: any;
    title: string;
    currentLang: string;

    constructor(public navCtrl: NavController,
        private navArgs: NavParams,
        private menuCtrl: MenuController,
        private translate: TranslateService,
        private events: Events
    ) {

        this.currentLang = this.translate.getDefaultLang();
        this.menuCtrl.enable(true);
        this.navData = this.navArgs.data;
        this.events.publish('getInfo');

    }

    ionViewDidLoad() {

        this.translate.get('SALESORDER').subscribe(res => {
            this.title = res;
        })
    }

    onTabSelect(ev: any) {
        switch (ev.index) {
            case 0:
                this.title = this.translate.instant('PURCHASEORDER');
                break;

            case 1:
                this.title = this.translate.instant('SALESORDER');
                break;

            case 2:
                this.title = this.translate.instant('RETAILER');
                break;
            default:
                break;
        }
    }
}
