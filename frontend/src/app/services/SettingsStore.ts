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
    this.http.get<ISettings>( 'settings' ).subscribe( ( s ) => this.settings = s )
  }

  settings: ISettings | null = null;
}
