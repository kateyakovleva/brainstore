import { Injectable } from '@angular/core';
import { AppClient } from './AppClient';
import { ISettings } from '../types/types';
import { Subject } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class SettingsStore {
  constructor(
    private http: AppClient,
  ) {
    this.http.get<ISettings>( 'settings' ).subscribe( ( s ) => {
      s.home_slides = s.home_slides.map( ( s, i ) => ( { ...s, index: i } ) );
      s.menu = s.header_menu.filter( m => m.data.status ).map( m => m.data );

      this.settings = s;
      this.$settings.next( s );
    } )
  }

  settings: ISettings | null = null;

  $settings = new Subject<ISettings | null>();
}
