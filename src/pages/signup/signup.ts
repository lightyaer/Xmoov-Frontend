import { Component } from '@angular/core';
import { NavController, AlertController, MenuController } from 'ionic-angular';
import { Driver } from '../../models/driver';
import { DriverProvider } from '../../services/driver.service';

import { OtpAuthPage } from '../otpAuth/otpAuth';



@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {

    driver: Driver;

    constructor(public navCtrl: NavController,
        private loginService: DriverProvider,
        private alertCtrl: AlertController,
        private menuCtrl: MenuController
    ) {
        this.menuCtrl.enable(false);
        this.driver = new Driver();
    }

    gotoLogin() {
        this.navCtrl.pop();
    }

    matchPasswords() {
        if (this.driver.password !== this.driver.repassword) {
            let passwordAlert = this.alertCtrl.create({
                title: 'Password',
                subTitle: 'Passwords do not Match',
                buttons: ['Ok']
            })
            passwordAlert.present();
        }
    }


    signup() {

        this.matchPasswords();
        this.loginService.signup(this.driver).then(res => {
            this.navCtrl.setRoot(OtpAuthPage);
        }).catch(e => {
            let loginAlert = this.alertCtrl.create({
                title: 'Server Error',
                subTitle: 'Please try again later.',
                buttons: ['Ok']
            })
            loginAlert.present();
        })
    }


}