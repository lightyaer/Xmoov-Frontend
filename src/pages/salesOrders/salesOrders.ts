import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { SalesOrderProvider } from '../../services/salesOrder.service';
import { SalesOrder } from '../../models/salesOrder';

import { SalesOrderDetailsPage } from '../salesOrderDetails/salesOrderDetails';
import { SalesOrderFilters } from '../../models/salesOrderFilters';
import { OrderStatus } from '../../models/orderStatus';
import { SalesOrderFiltersPage } from '../salesOrderFilters/salesOrderFilters';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-salesOrders',
  templateUrl: 'salesOrders.html'
})
export class SalesOrdersPage {


  currentLang: String;
  salesOrders: SalesOrder[];
  filters: SalesOrderFilters = new SalesOrderFilters();
  orderStatus: OrderStatus = new OrderStatus();
  constructor(public navCtrl: NavController,
    private salesOrderService: SalesOrderProvider,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private translate: TranslateService
  ) {
    this.currentLang = this.translate.getDefaultLang();
    this.getAllSalesOrders();
  }

  gotoEditSalesOrder(id: String) {
    let modal = this.modalCtrl.create(SalesOrderDetailsPage, { title: 'Edit Sales Order', id: id });

    modal.present();
    modal.onDidDismiss(() => {
      this.getAllSalesOrders();
    })
  }

  getAllSalesOrders() {
    this.salesOrderService.getAllSalesOrders(this.filters, this.orderStatus).then((res: SalesOrder[]) => {
      this.salesOrders = res
    }).catch(e => {

    })
  }

  showFiltersPage() {
    let filterModal = this.modalCtrl.create(SalesOrderFiltersPage, { filters: this.filters, orderStatus: this.orderStatus });
    filterModal.present();
    filterModal.onDidDismiss((data) => {
      if (data) {
        this.orderStatus = data.orderStatus;
        this.filters = data.filters;
        this.getAllSalesOrders();
      }

    })
  }

  gotoAddSalesOrderPage() {
    let modal = this.modalCtrl.create(SalesOrderDetailsPage);

    modal.present();
    modal.onDidDismiss(() => {
      this.getAllSalesOrders();
    })
  }

  deleteSalesOrder(id: String) {
    let deleteAlert = this.alertCtrl.create({
      title: 'Confirm',
      subTitle: 'Are you sure to Delete this Sales Order?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.salesOrderService.deleteSalesOrderByID(id).then((res) => {
            let toast = this.toastCtrl.create({
              message: 'Sales Order Deleted Successfully',
              duration: 3000
            });
            toast.present();
            this.getAllSalesOrders();
          }).catch(e => {
            let alert = this.alertCtrl.create({
              title: 'Error',
              subTitle: e.message,
              buttons: ['Ok']
            })
            alert.present();
          })
        }
      }, {
        text: 'No'
      }]
    })

    deleteAlert.present();


  }

}
