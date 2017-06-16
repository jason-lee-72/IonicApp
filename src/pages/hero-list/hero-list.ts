import { Component, OnInit } from '@angular/core';

import { NavController, NavParams, ItemSliding, AlertController, LoadingController, Loading } from 'ionic-angular';

import { HeroFormPage } from '../hero-form/hero-form';

import { Hero } from '../../app/models/hero';
import { HeroService } from '../../app/services/hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: 'hero-list.html'
})
export class HeroListPage implements OnInit {
  heroes: Array<Hero>;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public heroService: HeroService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    
    this.loading = this.loadingCtrl.create({
      content: 'Loading ...'
    });
  }

  ngOnInit() {
    this.loading.present();

    this.heroService.getHeroes().subscribe(
      heroes => {
        this.heroes = heroes;
      },
      response => {
        this.showErrorAlert(response, 'Couldn\'t get heroes.');
        this.heroes = [];
      },
      ()=>this.loading.dismiss()
    );
  }

  showErrorAlert(response: Response, message: string) {
    const errorAlert = this.alertCtrl.create({
      title: 'Error',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
          }
        }
      ]
    });
    errorAlert.present();
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
            this.heroService.delete(heroToDelete._id).subscribe(
              () => {
                this.heroes.splice(this.heroes.findIndex(hero => hero._id == heroToDelete._id), 1);
              },
              response => {
                this.showErrorAlert(response, 'Couldn\'t delete hero.');
              }
            );
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
}
1