import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Hero, POWERS } from '../../app/models/hero';
import { HeroService } from '../../app/services/hero.service';


import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  // MarkerOptions,
  // Marker
} from '@ionic-native/google-maps';
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
  addCallback: (hero: Hero) => void;
  updateCallback: (hero: Hero) => void;
  deleteCallback: (hero: Hero) => void;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public heroService: HeroService,
    private googleMaps: GoogleMaps) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad HeroFormPage');
  }

  ngAfterViewInit() {
     console.log('ngAfterViewInit HeroFormPage');
    this.loadMap();
  }

  loadMap() {
    console.log('loadMap HeroFormPage');
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    // create LatLng object
    let ionic: LatLng = new LatLng(43.0741904, -89.3809802);

    // create CameraPosition
    let position: CameraPosition = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    // let markerOptions: MarkerOptions = {
    //   position: ionic,
    //   title: 'Ionic'
    // };

    // const marker: Marker = map.addMarker(markerOptions)
    //   .then((marker: Marker) => {
    //     marker.showInfoWindow();
    //   });
  }
}
