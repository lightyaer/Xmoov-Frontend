import { Component } from '@angular/core';
import { Platform, AlertController, App, MenuController, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../pages/login/login';
import { DriverProvider } from '../services/driver.service';
import { Driver } from '../models/driver';
import { SettingsPage } from '../pages/settings/settings';
import { HomeTabsPage } from '../pages/homeTabs/homeTabs';
import { ConfigProvider } from '../services/config.service';
import { HttpResponse } from '@angular/common/http';
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
    private loginService: DriverProvider,
    private alertCtrl: AlertController,
    public _app: App,
    translate: TranslateService,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private configService: ConfigProvider,
    private events: Events
  ) {
    this.presentLoader();

    this.setupApp().then(() => {
      translate.setDefaultLang(this.driver.lang);
    }).then(() => {
      this.rootPage = HomeTabsPage;
    }).catch(() => {
      translate.setDefaultLang('en');
      this.rootPage = LoginPage;
    })

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


  async setupApp() {

    let res: any = await this.configService.getApiEndpoint();
    localStorage.setItem('api_endpoint', res.devApiEndPoint);
    await this.checkifLoggedIn();

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
    return new Promise((resolve, reject) => {
      var email = localStorage.getItem('email');
      if (email) {
        this.loginService.checkValidity(email).then((res: HttpResponse<Driver>) => {
          this.dismissLoader();
          this.driver = res.body;
          resolve();
        }).catch((e) => {
          this.dismissLoader();
          reject();
        })
      } else {
        this.dismissLoader();
        reject();
      }
    })
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

