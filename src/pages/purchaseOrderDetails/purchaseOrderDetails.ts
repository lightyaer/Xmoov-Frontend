import { Component } from '@angular/core';
import { NavController, ViewController, ToastController, AlertController } from 'ionic-angular';
import { PurchaseOrderProvider } from '../../services/purchaseOrder.service';
import { PurchaseOrder } from '../../models/purchaseOrder';
import { SalesOrderProvider } from '../../services/salesOrder.service';
import { SalesOrderFilters } from '../../models/salesOrderFilters';
import { OrderStatus } from '../../models/orderStatus';
import { SalesOrder } from '../../models/salesOrder';
import { NavParams } from 'ionic-angular/navigation/nav-params';


@Component({
  selector: 'page-purchaseOrderDetails',
  templateUrl: 'purchaseOrderDetails.html'
})
export class PurchaseOrderDetailsPage {

  title: string;
  isValid: boolean = true;
  purchaseOrder: PurchaseOrder = new PurchaseOrder();
  salesOrderFilters: SalesOrderFilters = new SalesOrderFilters();
  orderStatus: OrderStatus = new OrderStatus();
  salesOrders: SalesOrder[];

  constructor(public navCtrl: NavController,
    private navArgs: NavParams,
    private purchaseOrderService: PurchaseOrderProvider,
    private viewCtrl: ViewController,
    private salesOrderService: SalesOrderProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.title = this.navArgs.get('Title');
    this.purchaseOrder._id = this.navArgs.get('PurchaseOrderID');
    this.getAllSalesOrders();
    if (this.purchaseOrder._id) {
      this.getPurchaseOrderByID(this.purchaseOrder._id);
    }

  }

  // calcTotal() {
  //   let total = (+this.purchaseOrder.quantity * +this.purchaseOrder.unitPrice);
  //   this.purchaseOrder.total = total + (total * (this.purchaseOrder.tax / 100)) - (this.purchaseOrder.discount);
  // }

  getPurchaseOrderByID(id: string) {
    this.purchaseOrderService.getPurchaseOrderByID(id)
      .then((res: PurchaseOrder) => {
        this.purchaseOrder = res;
      })
  }

  getAllSalesOrders() {
    this.salesOrderService.getAllSalesOrders(this.salesOrderFilters, this.orderStatus)
      .then((res: SalesOrder[]) => {
        this.salesOrders = res;
      })
  }

  // validateValues(id: string) {

  //   const salesOrder = this.salesOrders.find(item => item._id === id);

  //   this.isValid = this.purchaseOrder.quantity <= salesOrder.quantity ? true : false;
    
  // }

  savePurchaseOrder() {
    if (this.isValid) {
      if (!this.navArgs.get('PurchaseOrderID')) {
        this.purchaseOrderService.savePurchaseOrder(this.purchaseOrder).then((res) => {
          let toast = this.toastCtrl.create({
            message: 'Purchase Order Added Successfully',
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
        this.purchaseOrderService.updatePurchaseOrderByID(this.purchaseOrder).then((res) => {
          let toast = this.toastCtrl.create({
            message: 'Purchase Order Saved Successfully',
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

  // changeValues(id: string) {

  //   if (!this.navArgs.get('PurchaseOrderID')) {
  //     let salesOrder = this.salesOrders.find(item => item._id === id);

  //     this.purchaseOrder.itemCode = salesOrder.itemCode;
  //     this.purchaseOrder.itemName = salesOrder.itemName;
  //     this.purchaseOrder.itemSubType = salesOrder.itemSubType;
  //     this.purchaseOrder.itemType = salesOrder.itemType;
  //     this.purchaseOrder.quantity = salesOrder.quantity;
  //     this.purchaseOrder.unitPrice = salesOrder.unitPrice;
  //   }


  // }

  closeModal() {
    this.viewCtrl.dismiss();
  }



}
