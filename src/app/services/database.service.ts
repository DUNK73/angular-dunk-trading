import { Injectable } from '@angular/core';

declare let firebase: any;
let database = firebase.database();

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public database = database;

  constructor() { }

}
