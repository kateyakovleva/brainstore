import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { isMobile } from '../../../utils/utils';
import { SettingsStore } from '../../../services/SettingsStore';
import { AppClient } from '../../../services/AppClient';
import { MarkdownComponent } from 'ngx-markdown';

@Component( {
  selector: 'app-form',
  standalone: true,
  imports: [
    NgIf,
    MarkdownComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
} )
export class FormComponent {
  constructor(
    private http: AppClient,
    public settings: SettingsStore
  ) {
  }

  isMobile = isMobile;
  loading = false;
  success = true;

  send( $event: Event ) {
    $event.preventDefault();
    const form = $event.target as HTMLFormElement;
    let object: any = {};
    new FormData( form ).forEach( function ( value, key ) {
      object[ key ] = value;
    } );
    this.loading = true;
    this.http.post( '/form-request', object )
      .subscribe( {
        next: ( r ) => {
          this.loading = false;
          this.success = true;
        },
        error: ( e ) => {
          this.loading = false;
          this.success = true;
        },
        complete: () => {
          this.loading = false;
          this.success = true;
        }
      } )
  }

  getYear() {
    return new Date().getFullYear();
  }
}
