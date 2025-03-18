import {Component, ViewEncapsulation} from '@angular/core';
import {isMobile, videoUrl} from '../../../utils/utils';
import {SettingsStore} from '../../../services/SettingsStore';
import {Carousel, CarouselPageEvent} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {AsyncPipe, NgIf} from '@angular/common';
import {MarkdownComponent} from 'ngx-markdown';
import {SafePipe} from '../../../pipes/SafePipe';
import {BehaviorSubject} from 'rxjs';
import {IHomeSlide} from '../../../types/types';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  templateUrl: './main-screen.component.html',
  imports: [
    Carousel,
    PrimeTemplate,
    NgIf,
    MarkdownComponent,
    SafePipe,
    AsyncPipe
  ],
  styleUrl: './main-screen.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MainScreenComponent {
  constructor(
    public settings: SettingsStore
  ) {
    this.settings.$settings.subscribe(s => {
      this.items = s?.home_slides || [];
      this.page.subscribe(p => {
        const el = document.getElementById('home_slide_' + p) as HTMLVideoElement;
        if (el) {
          console.log('eeeee', el)
          el.currentTime = 0;
          el.play().then();
        }
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          // if (!this.hovered) {
          this.page.next(this.getNextPage());
          // }
        }, (this.items[p]?.time || 2) * 1000);
      });
    })
  }

  items: IHomeSlide[] = [];

  timer: any = null;

  hovered: boolean = false;

  isMobile = isMobile;

  url(url: string, play = false) {
    return videoUrl(url, false, play);
  }

  page = new BehaviorSubject<number>(0);

  getNextPage() {
    let page = this.page.value + 1;
    let lastPage = this.settings.settings?.home_slides?.length || 0;
    if (page > lastPage) {
      page = 0;
    }

    return page;
  }

  change(event: CarouselPageEvent) {
    this.page.next(event.page || 0);
  }

  type(val: any) {
    console.log('=====', val);
    return '';
  }
}
