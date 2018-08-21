import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController, MenuController, LoadingController } from '@ionic/angular';
import { Driver } from '../../models/driver';
import { LoginProvider } from '../../services/driver.service';


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
    private loginService: LoginProvider,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private router: Router
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
      this.router.navigateByUrl('/homeTabs', {})
      this.navCtrl.setRoot(HomeTabsPage, driver);

    }).catch(e => {
      this.dismissLoader();

      this.alertCtrl.create({
        header: 'Error',
        subHeader: e.message,
        buttons: ['Ok']
      }).then((loginAlert) => {
        loginAlert.present();
      });

    });
  }

  gotoSignUp() {
    this.navCtrl.push(SignupPage);
  }

}
