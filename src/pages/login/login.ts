import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { HeroListPage } from '../hero-list/hero-list';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginWithFacebook() {
    this.facebook.login([]).
    then((facebookLoginResponse: FacebookLoginResponse) => {
      this.navCtrl.push(HeroListPage);
    }).
    catch((facebookLoginResponse: FacebookLoginResponse) => {
      debugger;
    });
  }
}
