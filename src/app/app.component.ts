import { Component } from '@angular/core';
import { Platform, AlertController, App, Events, MenuController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { LoginPage } from '../pages/login/login';
import { LoginProvider } from '../services/driver.service';
import { Driver } from '../models/driver';
import { SettingsPage } from '../pages/settings/settings';
import { HomeTabsPage } from '../pages/homeTabs/homeTabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  loader: any;
  nav: any;
  driver: Driver = new Driver();
  constructor(platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    public loginService: LoginProvider,
    public alertCtrl: AlertController,
    public _app: App,
    public events: Events,
    translate: TranslateService,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController
  ) {
    this.presentLoader();
    this.checkifLoggedIn();
    translate.setDefaultLang('en');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.events.subscribe('getInfo', () => {
        this.getInfo();
      })
    });


  }

  presentLoader() {
    this.loader = this.loadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true
    });
    this.loader.present();
  }

  dismissLoader() {
    this.loader.dismiss();
  }


  getInfo() {

    this.loginService.verify().then((res: Driver) => {
      this.driver = res;
    })
  }

  checkifLoggedIn() {
    var email = localStorage.getItem('email');
    if (email) {
      this.loginService.checkValidity(email).then((driver: Driver) => {
        this.dismissLoader();
        this.rootPage = HomeTabsPage;
      }).catch((e) => {
        this.dismissLoader();
        this.rootPage = LoginPage;
      })
    } else {
      this.rootPage = LoginPage;
      this.dismissLoader();
    }
  }


  logout() {
    let logoutAlert = this.alertCtrl.create({
      title: "Confirmation",
      subTitle: "Are you Sure to Logout?",
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.menuCtrl.close();
          this.loginService.logout().then((res) => {

            let root = this._app.getRootNavs()[0];
            root.setRoot(LoginPage);

          })
        }
      }, {
        text: 'Cancel'
      }]
    });
    logoutAlert.present();
  }

  settings() {
    let root = this._app.getRootNavs()[0];
    root.push(SettingsPage);
    this.menuCtrl.close();
  }

  home() {
    let root = this._app.getRootNavs()[0];
    root.setRoot(HomeTabsPage);
    this.menuCtrl.close();
  }

}

