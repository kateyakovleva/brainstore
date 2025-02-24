import { Injectable } from '@angular/core';
import { AppClient } from './AppClient';
import { ISettings } from '../types/types';

@Injectable( {
  providedIn: 'root'
} )
export class SettingsStore {
  constructor(
    private http: AppClient,
  ) {
    this.http.get<ISettings>( 'settings' ).subscribe( ( s ) => {
      s.home_slides.push( s.home_slides[ 0 ], s.home_slides[ 0 ], s.home_slides[ 0 ] )
      s.home_slides = s.home_slides.map( ( s, i ) => ( { ...s, index: i } ) )
      this.settings = s
    } )
  }

  settings: ISettings | null = null;
}
