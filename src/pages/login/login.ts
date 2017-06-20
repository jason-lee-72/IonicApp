import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { HeroListPage } from '../hero-list/hero-list';
import { SignupPage } from '../signup/signup';
import { Auth } from '../../providers/auth';
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
  loading: Loading;

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public facebook: Facebook, public authService: Auth,
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.navCtrl.setRoot(HeroListPage);
    }, (err) => {
      console.log("Not already authorized");
    });
  }

  login(email: String, password: String) {
    this.showLoader();
    this.authService.login({
      email: email,
      password: password
    }).then((result) => {
      console.log(result);
      this.loading.dismiss().then(()=>{
        this.navCtrl.setRoot(HeroListPage);
      });
      
    }, (err) => {
      this.loading.dismiss();
      
      this.alertCtrl.create({
        title: "Login failed",
        buttons: [
          {
            text: "OK",
            handler: ()=>{}
          }
        ]
      }).present();
    });
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

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }
}
