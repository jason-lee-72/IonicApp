import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Hero, POWERS } from '../../models/hero';
import { HeroService } from '../../providers/hero';

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
  @ViewChild(GoogleMapComponent) mapComponent;
  @ViewChild(NgForm) heroForm;
  mapMarker: Marker;
  mapOptions: any = { zoomControl: true };
  loading: Loading;

  addCallback: (hero: Hero) => void;
  updateCallback: (hero: Hero) => void;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public heroService: HeroService) {
  }

  ngOnInit() {
    const heroId: number = this.navParams.get('heroId');
    this.addCallback = this.navParams.get('addCallback');
    this.updateCallback = this.navParams.get('updateCallback');

    if (heroId) {
      const loading: Loading = this.showLoading('Loading...');
      this.heroService.getHero(this.navParams.get('heroId')).subscribe(
        hero => {
          loading.dismiss();
          
          this.hero = hero;
          if (this.hero.coordinates) {
            this.addOrSetMarker();
            this.mapComponent.map.setCenter(this.hero.coordinates);
            this.mapOptions.zoom = 4;
            this.mapOptions.center = this.hero.coordinates;
          }
        },
        response => {
          loading.dismiss();
          this.showErrorAlert(response, 'Couldn\'t get hero.').then(()=>this.navCtrl.pop());
        }
      );
    }
    else
      this.hero = new Hero();      
  }

  showLoading(content: string): Loading {
    const loading = this.loadingCtrl.create({
      content: content 
    });

    loading.present();
    return loading;
  }

  showErrorAlert(response: Response, message: string): Promise<any> {
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
    return errorAlert.present();
  }

  submitForm() {
    const saving: Loading = this.showLoading('Saving...');
    if (this.hero._id)
      this.heroService.update(this.hero).subscribe(
        (hero) => {
          this.updateCallback(hero);
          this.navCtrl.pop();
        },
        response => this.showErrorAlert(response, 'Couldn\'t update hero'),
        ()=>saving.dismiss()
      );
    else
      this.heroService.create(this.hero).subscribe(
        (addedHero: Hero) => {
          this.addCallback(addedHero);
          this.navCtrl.pop();
        },
        response => this.showErrorAlert(response, 'Couldn\'t create hero'),
        ()=>saving.dismiss());
  }

  onMapClick(e: LatLng) {
    this.hero.coordinates = e;

    this.heroForm.controls.lat.markAsDirty();
    this.heroForm.controls.lng.markAsDirty();
    
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
