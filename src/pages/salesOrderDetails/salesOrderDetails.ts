import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { SalesOrder } from '../../models/salesOrder';
import { SalesOrderProvider } from '../../services/salesOrder.service';
import { RetailerProvider } from '../../services/retailer.service';
import { Retailer } from '../../models/retailer';
import { OrderStatus } from '../../models/orderStatus';
import { RetailerFilters } from '../../models/retailerFilters';



@Component({
    selector: 'page-salesOrderDetails',
    templateUrl: 'salesOrderDetails.html'
})
export class SalesOrderDetailsPage {

    title: String;
    loader: any;
    salesOrder: SalesOrder = new SalesOrder();
    orderStatus: OrderStatus = new OrderStatus();
    retailers: Retailer[];
    constructor(public navCtrl: NavController,
        private viewCtrl: ViewController,
        public navArgs: NavParams,
        public salesOrderService: SalesOrderProvider,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public retailerService: RetailerProvider,
        public loadingCtrl: LoadingController) {

         
        this.title = this.navArgs.data.title;
        this.getAllRetailers();
        if (this.navArgs.data.id) {
            this.presentLoader();
            this.salesOrder._id = this.navArgs.data.id;
            this.getSalesOrderByID(this.salesOrder._id);
        }
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    presentLoader() {
        this.loader = this.loadingCtrl.create({
            spinner: 'crescent',
            showBackdrop: true
        });
        this.loader.present();
    }

    dismissLoader() {
        this.loader.dismiss();
    }

    calcTotal() {
        this.salesOrder.total = (this.salesOrder.quantity * this.salesOrder.unitPrice);
        this.salesOrder.grandTotal = this.salesOrder.total +
            ((this.salesOrder.tax / 100) * this.salesOrder.total) +
            (+this.salesOrder.commission) + (+this.salesOrder.handling) -
            this.salesOrder.discount;;
    }

    getAllRetailers() {
        this.retailerService.getRetailers(new RetailerFilters()).then((res: Retailer[]) => {
            this.retailers = res;
        })
    }

    getSalesOrderByID(id: String) {
        this.salesOrderService.getSalesOrderByID(id).then((res: SalesOrder) => {
            this.salesOrder = res;
            this.orderStatus = res.orderStatus;
            this.salesOrder.orderDate = new Date(this.salesOrder.orderDate).toISOString();
            this.dismissLoader();
        })
    }

    saveSalesOrder() {
        this.salesOrder.orderStatus = this.orderStatus;
        this.salesOrder.orderDate = new Date(this.salesOrder.orderDate).getTime().toString();
        if (!this.navArgs.data.id) {
            this.salesOrderService.saveSalesOrder(this.salesOrder).then((res) => {
                let toast = this.toastCtrl.create({
                    message: 'Sales Order Added Successfully',
                    duration: 3000
                });
                if (res) {
                    toast.present();
                }
                this.viewCtrl.dismiss();
            })
                .catch((err) => {
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: err.message,
                        buttons: ['Ok']
                    })
                    alert.present();
                })
        } else {
            this.salesOrderService.updateSalesOrderByID(this.salesOrder).then((res) => {
                let toast = this.toastCtrl.create({
                    message: 'Sales Order Saved Successfully',
                    duration: 3000
                });
                if (res) {
                    toast.present();
                }
            })
                .catch((err) => {
                    let alert = this.alertCtrl.create({
                        title: 'Error',
                        subTitle: err.message,
                        buttons: ['Ok']
                    })
                    alert.present();
                })
        }
    }

}