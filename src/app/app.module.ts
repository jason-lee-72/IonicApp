import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { HeroService } from './services/hero.service';

import { HeroListPage } from '../pages/hero-list/hero-list';
import { HeroFormPage } from '../pages/hero-form/hero-form';
import { LoginPage } from '../pages/login/login';

import { GoogleMapComponent } from '../components/google-map/google-map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Facebook } from '@ionic-native/facebook';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HeroListPage,
    HeroFormPage,
    GoogleMapComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,    
    LoginPage,
    HeroListPage,
    HeroFormPage
  ],
  providers: [
    HeroService,
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook
  ]
})
export class AppModule {}
