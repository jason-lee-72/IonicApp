import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../providers/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  loading: Loading;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, 
    public auth: Auth, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup(email: String, password: String) {
    this.showLoader();

    this.auth.createAccount({
      email: email,
      password: password
    }).then((result) => {
      this.loading.dismiss();
      this.navCtrl.pop();
    }).catch((error) => {
      this.loading.dismiss();
      
      this.alertCtrl.create({
        title: 'Error',
        message: error.json().error,
        buttons: [
          {
            text: 'OK',
            handler: () => {
            }
          }
        ]
      }).present();
    });
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
  }
}
