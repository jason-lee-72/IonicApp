import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { HeroListPage } from '../hero-list/hero-list';
import { SignupPage } from '../signup/signup';
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
  username: String;
  password: String;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.navCtrl.setRoot(HeroListPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }

  loginWithFacebook() {
    this.facebook
      .login(['public_profile'])
      .then((facebookLoginResponse: FacebookLoginResponse) => {
        this.navCtrl.setRoot(HeroListPage);
      })
      .catch((facebookLoginResponse: FacebookLoginResponse) => {
        debugger;
      });
  }
}
