import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Hero, POWERS } from '../../app/models/hero';
import { HeroService } from '../../app/services/hero.service';

import { MapPage } from '../map/map';
import { GoogleMapComponent } from '../../components/google-map/google-map';
import { LatLng, Marker, MarkerOptions } from '@ionic-native/google-maps';
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
  @ViewChild(GoogleMapComponent) mapComponent;
  @ViewChild(NgForm) heroForm;
  mapMarker: Marker;

  addCallback: (hero: Hero) => void;
  updateCallback: (hero: Hero) => void;

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

    if (heroId) {
      this.heroService.getHero(this.navParams.get('heroId')).then(hero => {
        this.hero = hero;
        if (this.hero.coordinates) {
          this.addOrSetMarker();
          this.mapComponent.map.setCenter(this.hero.coordinates);
        }
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

  onMapClick(e: LatLng) {
    this.heroForm.controls.lat.setValue(e.lat);
    this.heroForm.controls.lng.setValue(e.lng);
    
    this.addOrSetMarker();
  }

  onMapReady(e) {
    console.log('map is ready', e);
  }

  addOrSetMarker() {
    if (!this.mapMarker) {
      const markerOptions: MarkerOptions = {
        title: this.hero.name,
        snippet: this.hero.alterEgo,
        position: this.hero.coordinates
      };
      this.mapComponent.map.addMarker(markerOptions).then((marker) => {
        this.mapMarker = marker;
      });
    } else
      this.mapMarker.setPosition(this.hero.coordinates);
  }
}
