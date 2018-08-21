import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';

import { LoginProvider } from '../../services/driver.service';
import { HomeTabsPage } from '../homeTabs/homeTabs';




@Component({
    selector: 'page-otpAuth',
    templateUrl: 'otpAuth.html'
})
export class OtpAuthPage {

    otp: Number
    /**
     *
     */
    constructor(public navCtrl: NavController,
        private loginService: LoginProvider,
        private alertCtrl: AlertController,
        private menuCtrl: MenuController) {

        this.menuCtrl.enable(false);

    }

    otpAuth() {
        this.loginService.otpAuth(this.otp).then((res) => {
            this.navCtrl.setRoot(HomeTabsPage, res);
        }).catch(e => {
            let loginAlert = this.alertCtrl.create({
                title: 'Error',
                subTitle: e.message,
                buttons: ['Ok']
            })
            loginAlert.present();
            this.navCtrl.pop();
        })
    }

}
