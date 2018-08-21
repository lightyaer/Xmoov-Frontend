import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { PurchaseOrderProvider } from '../../services/purchaseOrder.service';
import { PurchaseOrder } from '../../models/purchaseOrder';
import { PurchaseOrderFilters } from '../../models/purchaseOrderFilters';
import { PurchaseOrderDetailsPage } from '../purchaseOrderDetails/purchaseOrderDetails';

@Component({
    selector: 'page-purchaseOrders',
    templateUrl: 'purchaseOrders.html'
})
export class PurchaseOrdersPage {

    purchaseOrders: PurchaseOrder[];
    filters: PurchaseOrderFilters = new PurchaseOrderFilters();


    constructor(public navCtrl: NavController,
        private purchaseOrderService: PurchaseOrderProvider,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {

        this.getAllPurchaseOrders();

    }

    getAllPurchaseOrders() {
        this.purchaseOrderService.getAllPurchaseOrders(this.filters).then(
            (res: PurchaseOrder[]) => {
                this.purchaseOrders = res;
            }
        )
    }


    gotoAddPurchaseOrderPage() {
        let modal = this.modalCtrl.create(PurchaseOrderDetailsPage, { Title: "Add Purchase Order" });
        modal.present();

        modal.onDidDismiss(() => {
            this.getAllPurchaseOrders();
        })
    }

    gotoEditPurchaseOrderPage(id: string) {
        let modal = this.modalCtrl.create(PurchaseOrderDetailsPage, { PurchaseOrderID: id, Title: "Edit Purchase Order" })
        modal.present();

        modal.onDidDismiss(() => {
            this.getAllPurchaseOrders();
        })
    }

    deletePurchaseOrder(id) {

        let deleteAlert = this.alertCtrl.create({
            title: 'Confirm',
            subTitle: 'Are you sure to Delete this Purchase Order?',
            buttons: [{
                text: 'Yes',
                handler: () => {

                    this.purchaseOrderService.deletePurchaseOrderByID(id).then((res) => {
                        let toast = this.toastCtrl.create({
                            message: 'Purchase Order Deleted Successfully',
                            duration: 3000
                        });
                        toast.present();
                        this.getAllPurchaseOrders();
                    })
                }
            }, {
                text: 'No'
            }]
        })

        deleteAlert.present();
    }

}
