import { Component, OnInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { HeroFormPage } from '../hero-form/hero-form';

import { Hero } from '../../app/models/hero';
import { HeroService } from '../../app/services/hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: 'hero-list.html'
})
export class HeroListPage implements OnInit {
  heroes: Array<Hero>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private heroService: HeroService) {
  }

  ngOnInit () {
    this.heroService.getHeroesObservable().subscribe(heroes => {
      this.heroes = heroes;
    })
  }

  itemTapped(event, heroId: number) {
    this.navCtrl.push(HeroFormPage, {
      heroId: heroId,
      updateCallback: this.updateHeroInList.bind(this),
      deleteCallback: this.removeHeroFromList.bind(this)
    });
  }
  
  addHero() {
    this.navCtrl.push(HeroFormPage, {
      addCallback: this.addHeroToList.bind(this)
    });
  }

  removeHeroFromList(deletedHero: Hero) {
    this.heroes.splice(this.heroes.findIndex(hero => hero._id == deletedHero._id), 1);
  }

  updateHeroInList(updatedHero: Hero) {
    this.heroes[this.heroes.findIndex(hero => hero._id == updatedHero._id)] = updatedHero;
  }

  addHeroToList(newHero: Hero) {
    this.heroes.push(newHero);
  }

  
}
