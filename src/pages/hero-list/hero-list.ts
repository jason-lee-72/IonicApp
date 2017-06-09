import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, ItemSliding, AlertController } from 'ionic-angular';

import { HeroFormPage } from '../hero-form/hero-form';

import { Hero } from '../../app/models/hero';
import { HeroService } from '../../app/services/hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: 'hero-list.html'
})
export class HeroListPage implements OnInit {
  heroes: Array<Hero>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private heroService: HeroService, private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.heroService.getHeroesObservable().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  itemTapped(event, slidingItem: ItemSliding, heroId: number) {
    if (slidingItem.getOpenAmount() == 0)
      this.navCtrl.push(HeroFormPage, {
        heroId: heroId,
        updateCallback: this.updateHeroInList.bind(this)
      }); 
  }

  addHero() {
    this.navCtrl.push(HeroFormPage, {
      addCallback: this.addHeroToList.bind(this)
    });
  }

  deleteHero(heroToDelete: Hero, slidingItem: ItemSliding) {
    const confirmDelete = this.alertCtrl.create({
      title: 'Delete hero?',
      buttons: [
        {
          text: "OK",
          handler: () => {
            this.heroService.delete(heroToDelete._id).then(() => {
              this.heroes.splice(this.heroes.findIndex(hero => hero._id == heroToDelete._id), 1);
            });
          }
        },
        {
          text: "Cancel",
          handler: () => {
            slidingItem.close();
          }
        }
      ]
    });

    confirmDelete.present();
  }

  updateHeroInList(updatedHero: Hero) {
    this.heroes[this.heroes.findIndex(hero => hero._id == updatedHero._id)] = updatedHero;
  }

  addHeroToList(newHero: Hero) {
    this.heroes.push(newHero);
  }

  slidingItemDrag(slidingItem: ItemSliding) {
    
  }
}
1