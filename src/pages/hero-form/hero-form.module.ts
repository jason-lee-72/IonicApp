import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroFormPage } from './hero-form';

@NgModule({
  declarations: [
    HeroFormPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroFormPage),
  ],
  exports: [
    HeroFormPage
  ]
})
export class HeroFormPageModule {}
