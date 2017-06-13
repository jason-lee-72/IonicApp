import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
export class HeroFormPage implements OnInit, AfterViewInit {
  hero: Hero;
  powers = POWERS;
  mapPage = MapPage;
  @ViewChild(GoogleMapComponent) mapComponent;
  mapMarker: Marker;
  
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
        if (this.mapComponent && this.hero.coordinates)
          this.mapComponent.map.setCenter(new LatLng(this.hero.coordinates.latitude, this.hero.coordinates.longitude));
      });
    }
    else
      this.hero = new Hero();
  }

  ngAfterViewInit() {
    if (this.hero.coordinates) {
        const latLng: LatLng = new LatLng(this.hero.coordinates.latitude, this.hero.coordinates.longitude);
        this.addOrSetMarker(latLng);
        this.mapComponent.map.setCenter(latLng);
    }          
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

  onMapClick(e: LatLng) {
    console.log('map was clicked', e.lat, ' - ', e.lng);
    this.addOrSetMarker(e);
  }

  onMapReady(e) {
    console.log('map is ready', e);
    if (this.hero && this.hero.coordinates)
      this.mapComponent.map.setCenter(new LatLng(this.hero.coordinates.latitude, this.hero.coordinates.longitude));
  }

  addOrSetMarker(latLng: LatLng) {
    if (!this.mapMarker) {
      const markerOptions: MarkerOptions = {
        title: this.hero.name,
        snippet: this.hero.alterEgo,
        position: latLng
      };
      this.mapComponent.map.addMarker(markerOptions).then((marker) => {
        this.mapMarker = marker;
      });
    } else
      this.mapMarker.setPosition(latLng);
  }
}
