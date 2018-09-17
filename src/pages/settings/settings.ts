import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DriverProvider } from '../../services/driver.service';
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  arabic: boolean;
  english: boolean;

  constructor(public navCtrl: NavController,
    public translate: TranslateService,
    private driverService: DriverProvider
  ) {

    this.arabic = this.translate.getDefaultLang() == 'ar' ? true : false;
    this.english = this.translate.getDefaultLang() == 'en' ? true : false;

  }

  changeLanguagetoEnglish() {
    this.translate.setDefaultLang('en');
    this.driverService.setLanguage('en');
    this.english = true;
    this.arabic = false;

  }


  changeLanguagetoArabic() {
    this.translate.setDefaultLang('ar');
    this.driverService.setLanguage('ar');
    this.arabic = true;
    this.english = false;
  }



}
