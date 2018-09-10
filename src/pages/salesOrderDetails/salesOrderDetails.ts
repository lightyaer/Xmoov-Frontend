import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { SalesOrder } from '../../models/salesOrder';
import { SalesOrderProvider } from '../../services/salesOrder.service';
import { RetailerProvider } from '../../services/retailer.service';
import { Retailer } from '../../models/retailer';
import { OrderStatus } from '../../models/orderStatus';
import { RetailerFilters } from '../../models/retailerFilters';
import { Product } from '../../models/product';
import { ProductProvider } from '../../services/product.service';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { TranslateService } from '@ngx-translate/core';
import { ConfigProductPage } from '../config-product/config-product';




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
    products: Product[];
    selectedProducts: Product[];
    constructor(public navCtrl: NavController,
        private viewCtrl: ViewController,
        private navArgs: NavParams,
        private salesOrderService: SalesOrderProvider,
        private toastCtrl: ToastController,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController,
        private retailerService: RetailerProvider,
        private loadingCtrl: LoadingController,
        private productService: ProductProvider,
        private translate: TranslateService
    ) {
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
        console.log(this.salesOrder.productObjects);

        this.salesOrder.total = 0;
        this.salesOrder.productObjects.map(item => {
            this.salesOrder.total += +item.price * item.quantity;
        })

        this.salesOrder.grandTotal = +this.salesOrder.total +
            +(+(+this.salesOrder.tax / 100) * +this.salesOrder.total) +
            (+this.salesOrder.commission) + (+this.salesOrder.handling) -
            +this.salesOrder.discount;
        console.log(this.salesOrder.total);
        console.log(this.salesOrder.grandTotal);

    }

    searchProducts(event: {
        component: SelectSearchableComponent,
        text: string
    }) {
        let lang;
        let name = event.text;
        if (name.length >= 3) {
            event.component.startSearch();
            lang = this.translate.getDefaultLang();
            this.productService.getAllProducts(name, lang).then((res: Product[]) => {
                event.component.items = res;

                // Get ports from a storage and stop searching.
                event.component.endSearch();
            });
        }

    }

    productChange(event: {
        component: SelectSearchableComponent,
        value: any
    }) {
        if (this.selectedProducts.length > 0) {
            let modal = this.modalCtrl.create(ConfigProductPage, { products: this.selectedProducts })
            modal.present();

            modal.onDidDismiss(products => {
                if (products) {
                    this.selectedProducts = products;
                    this.salesOrder.productObjects = products;
                }
            })
        }
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
            this.selectedProducts = res.productObjects;
            this.salesOrder.orderDate = new Date(res.orderDate).toISOString();
            this.dismissLoader();
        })
    }

    saveSalesOrder() {
        this.salesOrder.orderStatus = this.orderStatus;
        console.log(this.salesOrder.orderDate);
        this.salesOrder.orderDate = new Date(this.salesOrder.orderDate).getTime().toString();
        console.log(this.salesOrder.orderDate);
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