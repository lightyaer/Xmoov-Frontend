import { Component } from '@angular/core';
import { NavController, AlertController, MenuController, LoadingController } from 'ionic-angular';
import { Driver } from '../../models/driver';
import { DriverProvider } from '../../services/driver.service';


import { SignupPage } from '../signup/signup';
import { HomeTabsPage } from '../homeTabs/homeTabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  driver: Driver;
  loader: any;
  constructor(public navCtrl: NavController,
    private loginService: DriverProvider,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,

  ) {
    this.loaderInit();
    this.menuCtrl.enable(false);
    this.driver = new Driver();
  }

  loaderInit() {
    this.loader = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
  }

  presentLoader() {

    this.loader.present();
  }

  dismissLoader() {
    this.loader.dismiss();
  }

  login() {
    this.presentLoader();
    this.loginService.login(this.driver).then((driver: Driver) => {
      this.dismissLoader();
      
      this.navCtrl.setRoot(HomeTabsPage, driver);

    }).catch(e => {
      this.dismissLoader();

      let loginAlert = this.alertCtrl.create({
        title: 'Error',
        subTitle: e.message,
        buttons: ['Ok']
      })
      loginAlert.present();


    });
  }

  gotoSignUp() {
    this.navCtrl.push(SignupPage);
  }

}
