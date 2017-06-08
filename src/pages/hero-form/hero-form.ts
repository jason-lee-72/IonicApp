import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Hero, POWERS } from '../../app/models/hero';
import { HeroService } from '../../app/services/hero.service';

import { MapPage } from '../map/map';

/**
 * Generated class for the HeroFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hero-form',
  templateUrl: 'hero-form.html',
})
export class HeroFormPage implements OnInit {
  hero: Hero;
  powers = POWERS;
  mapPage = MapPage;

  addCallback: (hero: Hero) => void;
  updateCallback: (hero: Hero) => void;
  deleteCallback: (hero: Hero) => void;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public heroService: HeroService) {
  }

  ngOnInit() {
    const heroId: number = this.navParams.get('heroId');
    this.addCallback = this.navParams.get('addCallback');
    this.updateCallback = this.navParams.get('updateCallback');
    this.deleteCallback = this.navParams.get('deleteCallback');

    if (heroId) {
      this.heroService.getHero(this.navParams.get('heroId')).then(hero => {
        this.hero = hero;
      });
    }
    else
      this.hero = new Hero();
  }

  submitForm() {
    if (this.hero._id)
      this.heroService.update(this.hero).then(() => {
        this.updateCallback(this.hero);
        this.navCtrl.pop();
      })
    else
      this.heroService.create(this.hero).then((addedHero: Hero) => {
        this.addCallback(addedHero);
        this.navCtrl.pop();
      });
  }

  deleteHero() {
    const confirmDelete = this.alertCtrl.create({
      title: 'Delete hero?',
      message: 'Delete this hero?',
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.heroService.delete(this.hero._id).then(() => {
              this.deleteCallback(this.hero);
              this.navCtrl.pop();
            });
          }
        },
        {
          text: "Cancel",
          handler: () => {
          }
        }
      ]
    });

    confirmDelete.present();
  }
}
