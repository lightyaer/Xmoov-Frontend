import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SuperTabsModule } from 'ionic2-super-tabs'
import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SelectSearchableModule } from 'ionic-select-searchable';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


import { LoginProvider } from '../services/driver.service';
import { RetailerProvider } from '../services/retailer.service';
import { SalesOrderProvider } from '../services/salesOrder.service';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { OtpAuthPage } from '../pages/otpAuth/otpAuth';
import { SalesOrdersPage } from '../pages/salesOrders/salesOrders';
import { RetailersPage } from '../pages/retailers/retailers';
import { DriverProfilePage } from '../pages/driverProfile/driverProfile';
import { HomeTabsPage } from '../pages/homeTabs/homeTabs';
import { SalesOrderDetailsPage } from '../pages/salesOrderDetails/salesOrderDetails';

import { RetailerDetailsPage } from '../pages/retailerDetails/retailerDetails';
import { SettingsPage } from '../pages/settings/settings';
import { SalesOrderFiltersPage } from '../pages/salesOrderFilters/salesOrderFilters';
import { PurchaseOrdersPage } from '../pages/purchaseOrders/purchaseOrders';
import { PurchaseOrderDetailsPage } from '../pages/purchaseOrderDetails/purchaseOrderDetails';
import { PurchaseOrderProvider } from '../services/purchaseOrder.service';
import { ProductProvider } from '../services/product.service';
import { ConfigProductPage } from '../pages/config-product/config-product';


let pages = [
  MyApp,
  LoginPage,
  SignupPage,
  OtpAuthPage,
  SalesOrdersPage,
  RetailersPage,
  DriverProfilePage,
  HomeTabsPage,
  SalesOrderDetailsPage,
  SettingsPage,
  RetailerDetailsPage,
  SalesOrderFiltersPage,
  PurchaseOrdersPage,
  PurchaseOrderDetailsPage,
  ConfigProductPage
]


@NgModule({
  declarations: pages,
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {

    }),
    SuperTabsModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    SelectSearchableModule
  ],
  bootstrap: [IonicApp],
  entryComponents: pages,
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginProvider,
    RetailerProvider,
    SalesOrderProvider,
    ProductProvider,
    PurchaseOrderProvider
  ]
})
export class AppModule { }
