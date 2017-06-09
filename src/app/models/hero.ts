import { BaseModel } from './base-model'

export class Hero extends BaseModel {
  constructor(
    public _id?: number,
    public name?: string,
    public power?: string,
    public alterEgo?: string,
    public coordinates?: {
      longitude?: number,
      latitude?: number
    }
  ) {  
    super();

    if (!coordinates)
      this.coordinates = {};
  }
}

export const POWERS = [
    'Really Smart',
    'Super Flexible',
    'Super Hot',
    'Weather Changer'
];