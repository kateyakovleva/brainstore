import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { isMobile } from '../../utils/utils';
import { MobileHeaderComponent } from '../mobile-header/mobile-header.component';
import { SettingsStore } from '../../services/SettingsStore';
import { IMenuItem } from '../../types/types';

@Component( {
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MobileHeaderComponent,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
} )
export class HeaderComponent {
  constructor(
    private router: Router,
    public settings: SettingsStore,
  ) {
    this.router.events.subscribe( ( e ) => {
      if ( e instanceof NavigationEnd ) {
        this.current_location = e.url;
      }
    } );
  }

  isMobile = isMobile;

  mobile_header = false;

  current_location = '/';

  openMobileHeader() {
    this.mobile_header = !this.mobile_header;
  }

  getLink( item: IMenuItem ) {
    let path: any = item.link.split( '#' );
    path = path[ 0 ];

    if ( path === this.current_location ) {
      path = '#';
    }

    return path;
  }

  toSection( item: IMenuItem, event?: any ) {
    let name = item.link.split( '#' )[ 1 ];

    setTimeout( () => {
      let top = ( document.querySelector( 'app-' + name ) as HTMLElement )?.offsetTop - 95;
      document.scrollingElement?.scrollTo( { top: top, behavior: 'smooth' } );
    }, 100 );
  }

}
