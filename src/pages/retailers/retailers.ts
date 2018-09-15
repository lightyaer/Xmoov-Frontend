import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, ToastController } from 'ionic-angular';
import { RetailerProvider } from '../../services/retailer.service';
import { Retailer } from '../../models/retailer';
import { RetailerDetailsPage } from '../retailerDetails/retailerDetails';
import { RetailerFilters } from '../../models/retailerFilters';

@Component({
    selector: 'page-retailers',
    templateUrl: 'retailers.html'
})
export class RetailersPage {


    retailers: Retailer[];
    filters: RetailerFilters = new RetailerFilters();
    constructor(public navCtrl: NavController,
        private retailerService: RetailerProvider,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {
        this.getAllRetailers();

    }

    getAllRetailers() {
        this.retailerService.getRetailers(this.filters).then((res: Retailer[]) => {
            this.retailers = res;
        })
    }

    gotoAddRetailerPage() {
        let modal = this.modalCtrl.create(RetailerDetailsPage);
        modal.present();
    }

    gotoEditRetailer(id: String) {
        let modal = this.modalCtrl.create(RetailerDetailsPage, { id: id });
        modal.present();
    }

    deleteRetailer(id: String) {
        let deleteAlert = this.alertCtrl.create({
            title: 'Confirm',
            subTitle: 'Are you sure to Delete this Retailer?',
            buttons: [{
                text: 'Yes',
                handler: () => {
                    this.retailerService.deleteRetailerbyID(id).then((res) => {
                        let toast = this.toastCtrl.create({
                            message: 'Retailer Deleted Successfully',
                            duration: 3000
                        });
                        toast.present();
                        this.getAllRetailers();
                    })
                }
            }, {
                text: 'No'
            }]
        })

        deleteAlert.present();


    }


}
