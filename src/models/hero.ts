import { BaseModel } from './base-model'
import { LatLng } from '@ionic-native/google-maps';

export class Hero extends BaseModel {
  constructor(
    public _id?: number,
    public name?: string,
    public power?: string,
    public alterEgo?: string,
    public coordinates?: LatLng
  ) {  
    super();
    if (!coordinates)
      this.coordinates = new LatLng(0, 0);
  }
}

export const POWERS = [
    'Really Smart',
    'Super Flexible',
    'Super Hot',
    'Weather Changer'
];