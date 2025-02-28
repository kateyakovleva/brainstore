import { Component, ViewEncapsulation } from '@angular/core';
import { isMobile, videoUrl } from '../../../utils/utils';
import { SettingsStore } from '../../../services/SettingsStore';
import { Carousel, CarouselPageEvent } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { NgIf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { SafePipe } from '../../../pipes/SafePipe';

@Component( {
  selector: 'app-main-screen',
  standalone: true,
  templateUrl: './main-screen.component.html',
  imports: [
    Carousel,
    PrimeTemplate,
    NgIf,
    MarkdownComponent,
    SafePipe
  ],
  styleUrl: './main-screen.component.scss',
  encapsulation: ViewEncapsulation.None,
} )
export class MainScreenComponent {
  constructor(
    public settings: SettingsStore
  ) {
    if ( this.timer ) clearInterval( this.timer );
    // this.timer = setInterval( () => {
    //   if ( this.hovered ) return;
    //   this.page = this.getNextPage()
    // }, 2000 )
  }

  timer: any = null;

  hovered: boolean = false;

  isMobile = isMobile;

  url( url: string, play = false ) {
    return videoUrl( url, false, play );
  }

  page: number = 0;

  getNextPage() {
    let page = this.page + 1;
    let lastPage = this.settings.settings?.home_slides?.length || 0;
    if ( page > lastPage ) {
      page = 0;
    }

    return page;
  }

  change( event: CarouselPageEvent ) {
    this.page = event.page || 0;
  }
}
