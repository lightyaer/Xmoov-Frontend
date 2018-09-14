import { Component, ViewChild } from '@angular/core';
import { NavController, ViewController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { PurchaseOrderProvider } from '../../services/purchaseOrder.service';
import { PurchaseOrder } from '../../models/purchaseOrder';
import { SalesOrderProvider } from '../../services/salesOrder.service';
import { SalesOrderFilters } from '../../models/salesOrderFilters';
import { OrderStatus } from '../../models/orderStatus';
import { SalesOrder } from '../../models/salesOrder';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { TranslateService } from '@ngx-translate/core';
import { Product } from '../../models/product';
import { SelectSearchableComponent } from 'ionic-select-searchable';
import { ConfigProductPage } from '../config-product/config-product';


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
  selectedProducts: Product[];
  salesOrders: SalesOrder[];
  selectedSalesOrder: SalesOrder;
  products: Product[];
  currentLang: string;
  @ViewChild('productComponent') productComponent: SelectSearchableComponent;

  constructor(public navCtrl: NavController,
    private navArgs: NavParams,
    private purchaseOrderService: PurchaseOrderProvider,
    private viewCtrl: ViewController,
    private salesOrderService: SalesOrderProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private modalCtrl: ModalController,

  ) {
    this.currentLang = this.translate.getDefaultLang();
    this.purchaseOrder._id = this.navArgs.get('PurchaseOrderID');
    this.getAllSalesOrders();
    if (this.purchaseOrder._id) {
      this.title = this.translate.instant('EDIT') + " " + this.translate.instant('PURCHASEORDER');
      this.getPurchaseOrderByID(this.purchaseOrder._id);
    } else {
      this.title = this.translate.instant('CREATE') + " " + this.translate.instant('PURCHASEORDER')
    }

  }

  ionViewDidLoad() {

    this.productComponent.isEnabled = this.navArgs.get('PurchaseOrderID') ? true : false;
    if (this.currentLang === 'en') {
      this.productComponent.itemTextField = "nameEn"
      this.productComponent.searchFailText = "No Products found."
      this.productComponent.searchPlaceholder = "Enter Product name";
    } else {
      this.productComponent.itemTextField = "nameAr"
      this.productComponent.searchFailText = "لم يتم العثور على منتجات"
      this.productComponent.searchPlaceholder = "أدخل اسم المنتج";
    }
  }

  calcTotal() {
    this.purchaseOrder.total = 0;
    this.selectedProducts.map(prod => {
      this.purchaseOrder.total += +prod.price * +prod.quantity
    })
    this.purchaseOrder.grandTotal = +this.purchaseOrder.total +
      +(+(+this.purchaseOrder.tax / 100) * +this.purchaseOrder.total) -
      +this.purchaseOrder.discount;

    this.purchaseOrder.total = +this.purchaseOrder.total.toFixed(2)
    this.purchaseOrder.grandTotal = +this.purchaseOrder.grandTotal.toFixed(2);
  }

  getPurchaseOrderByID(id: string) {
    this.purchaseOrderService.getPurchaseOrderByID(id)
      .then((res: PurchaseOrder) => {
        this.purchaseOrder = res;
        this.products = this.purchaseOrder.productObjects;
        this.selectedProducts = this.purchaseOrder.productObjects;
      })
  }

  getAllSalesOrders() {
    this.salesOrderService.getAllSalesOrders(this.salesOrderFilters, this.orderStatus)
      .then((res: SalesOrder[]) => {
        this.salesOrders = res;
      })
  }

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

  productChange(event: {
    component: SelectSearchableComponent,
    value: any
  }) {
    if (this.products.length > 0) {
      let modal = this.modalCtrl.create(ConfigProductPage, { salesOrder: this.selectedSalesOrder, products: this.selectedProducts, fromPO: true })
      modal.present();

      modal.onDidDismiss(products => {
        if (products) {
          this.products = products;
          this.purchaseOrder.productObjects = products;
        }
      })
    }
  }

  changeValues(id: string) {
    let salesOrder = this.salesOrders.find(item => item._id === id);
    this.selectedSalesOrder = salesOrder;
    this.products = salesOrder.productObjects;
    this.productComponent.isEnabled = true;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }



}
