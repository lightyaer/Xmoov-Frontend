import { Component } from '@angular/core';
import {  ViewController, NavParams } from 'ionic-angular';
import { SalesOrderFilters, OrderStatus } from '../../models/salesOrderFilters';

@Component({
    selector: 'page-salesOrderFilters',
    templateUrl: 'salesOrderFilters.html'
})

export class SalesOrderFiltersPage {

    /**
     *
     */
    filters: SalesOrderFilters = new SalesOrderFilters();
    orderStatus: OrderStatus = new OrderStatus();
    selectedOrderStatus: string = "orderCreated";
    constructor(private viewCtrl: ViewController, public navArgs: NavParams) {
        this.filters = this.navArgs.get('filters');
        this.orderStatus = this.navArgs.get('orderStatus');
    
    }


    closeModal() {
        this.viewCtrl.dismiss();
    }
    clearOrderDate() {
        this.filters.orderDate = new Date('9999');
    }

    filterSalesOrders() {
        this.selectedOrderStatus ? this.selectedOrderStatus : "orderCreated";
        for(let item in this.orderStatus) {
            this.orderStatus[item] = false;
        }
        this.orderStatus[this.selectedOrderStatus] = true;
        this.viewCtrl.dismiss({ orderStatus: this.orderStatus, filters: this.filters });
    }
}