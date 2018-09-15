import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { RetailerProvider } from '../../services/retailer.service';
import { Retailer } from '../../models/retailer';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-retailerDetails',
    templateUrl: 'retailerDetails.html'
})
export class RetailerDetailsPage {

    title: String
    retailer: Retailer = new Retailer();
    constructor(public navCtrl: NavController,
        private retailerService: RetailerProvider,
        public viewCtrl: ViewController,
        public navArgs: NavParams,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        private translate: TranslateService
    ) {

        if (this.navArgs.data.id) {
            this.title = this.translate.instant('EDIT') + " " + this.translate.instant('RETAILER');
            this.retailer._id = this.navArgs.data.id;
            this.getRetailerDetailsByID(this.retailer._id);
        } else {
            this.title = this.translate.instant('CREATE') + " " + this.translate.instant('RETAILER');
        }
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

    getRetailerDetailsByID(id: String) {
        this.retailerService.getRetailerbyID(id).then((res: Retailer) => {
            this.retailer = res;
        })
    }


    saveRetailer() {

        if (!this.navArgs.data.id) {
            this.retailerService.saveRetailer(this.retailer).then((res) => {
                let toast = this.toastCtrl.create({
                    message: 'Retailer Added Successfully',
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
        } else {
            this.retailerService.updateRetailerbyID(this.retailer).then((res) => {
                let toast = this.toastCtrl.create({
                    message: 'Retailer Added Successfully',
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