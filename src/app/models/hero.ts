import { BaseModel } from './base-model'

export class Hero extends BaseModel {
  constructor(
    public _id?: number,
    public name?: string,
    public power?: string,
    public alterEgo?: string
  ) {  
    super();
  }
}

export const POWERS = [
    'Really Smart',
    'Super Flexible',
    'Super Hot',
    'Weather Changer'
];