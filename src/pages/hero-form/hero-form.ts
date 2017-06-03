import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Hero, POWERS } from '../../app/models/hero';
import { HeroService } from '../../app/services/hero.service';

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
  callback: (hero:Hero) => void;

  constructor(public navCtrl: NavController, public navParams: NavParams, public heroService: HeroService) {
  }

  ngOnInit() {
    const heroId: number = this.navParams.get('heroId');
    this.callback = this.navParams.get('callback');

    if (heroId) {
      this.heroService.getHero(this.navParams.get('heroId')).then(hero => {
        this.hero = hero;
      });
    }
    else
      this.hero = new Hero();
  }
  
  submitForm () {
    if(this.hero._id)
      this.heroService.update(this.hero).then(() => {
        this.callback(this.hero);
        this.navCtrl.pop();
      })
    else
      this.heroService.create(this.hero).then((addedHero: Hero) => {
        this.callback(addedHero);
        this.navCtrl.pop();
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeroFormPage');
  }

}
