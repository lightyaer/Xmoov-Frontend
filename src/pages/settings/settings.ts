import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  arabic: boolean;
  english: boolean;

  constructor(public navCtrl: NavController,
    public translate: TranslateService
  ) {

    this.arabic = this.translate.getDefaultLang() == 'ar' ? true : false;
    this.english = this.translate.getDefaultLang() == 'en' ? true : false;

  }

  changeLanguagetoEnglish() {
    this.translate.setDefaultLang('en');
    this.english = true;
    this.arabic = false;

  }


  changeLanguagetoArabic() {
    this.translate.setDefaultLang('ar');
    this.arabic = true;
    this.english = false;
  }



}
