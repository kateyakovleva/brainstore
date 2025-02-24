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
  }

  isMobile = isMobile;

  url( url: string, play = false ) {
    return videoUrl( url, false, play );
  }

  page: number | undefined = 0;

  change( event: CarouselPageEvent ) {
    this.page = event.page;
  }
}
