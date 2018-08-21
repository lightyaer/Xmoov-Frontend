import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Events } from '@ionic/angular';
import { SalesOrdersPage } from '../salesOrders/salesOrders';
import { RetailersPage } from '../retailers/retailers';
import { PurchaseOrdersPage } from '../purchaseOrders/purchaseOrders';



@Component({
    selector: 'page-homeTabs',
    templateUrl: 'homeTabs.html'
})
export class HomeTabsPage {

    PurchaseOrders: any = PurchaseOrdersPage;
    SalesOrders: any = SalesOrdersPage;
    Retailers: any = RetailersPage;
    navData: any;

    constructor(public navCtrl: NavController,
        private navArgs: NavParams,
        public menuCtrl: MenuController,
        public events: Events
    ) {

        this.menuCtrl.enable(true);
        this.navData = this.navArgs.data;
        this.events.publish('getInfo');

    }


}
