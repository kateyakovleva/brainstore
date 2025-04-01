import {Component, HostListener, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {isMobile} from '../../../utils/utils';
import {SettingsStore} from '../../../services/SettingsStore';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MarkdownComponent} from 'ngx-markdown';
import {SafePipe} from '../../../pipes/SafePipe';
import {BehaviorSubject} from 'rxjs';
import {IHomeSlide} from '../../../types/types';
import {WrapShortWordsPipe} from "../../../pipes/wrapShortWords";

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
    AsyncPipe,
    NgForOf,
    WrapShortWordsPipe
  ],
  styleUrl: './main-screen.component.scss',
  encapsulation: ViewEncapsulation.None,
})
// export class MainScreenComponent {
//   constructor(
//     public settings: SettingsStore
//   ) {
//     Carousel.prototype.onTouchMove = (e) => {
//       e = e as TouchEvent;
//       if (this.y) {
//         const y = this.y - e.changedTouches[0].clientY;
//         if (document.scrollingElement)
//           document.scrollingElement.scrollTop = document.scrollingElement.scrollTop + y;
//         this.y = e.changedTouches[0].clientY;
//       }
//     };
//     Carousel.prototype.onTouchStart = (e) => {
//       this.y = e.changedTouches[0].clientY;
//       // console.log('====', e)
//     };
//     Carousel.prototype.onTouchEnd = (e) => {
//       this.y = 0;
//       // console.log('====', e)
//     };
//     if (!this.settings.settings?.home_slides.length) {
//       this.settings.$settings.subscribe(s => {
//         this.items = s?.home_slides || [];
//         this.page.subscribe(p => this.init(p));
//       });
//     } else {
//       this.items = this.settings.settings?.home_slides;
//       this.page.subscribe(p => this.init(p));
//     }
//   }
//
//   y = 0;
//
//   init(p: number) {
//     const el = document.getElementById('home_slide_' + p) as HTMLVideoElement;
//     if (el) {
//       el.currentTime = 0;
//       el.play().then();
//     }
//     if (this.timer) clearTimeout(this.timer);
//     this.timer = setTimeout(() => {
//       // if (!this.hovered) {
//       this.page.next(this.getNextPage());
//       // }
//     }, (this.items[p]?.time || 2) * 1000);
//   }
//
//   items: IHomeSlide[] = [];
//
//   timer: any = null;
//
//   hovered: boolean = false;
//
//   isMobile = isMobile;
//
//   url(url: string, play = false) {
//     return videoUrl(url, false, play);
//   }
//
//   page = new BehaviorSubject<number>(0);
//
//   getNextPage() {
//     let page = this.page.value + 1;
//     let lastPage = this.settings.settings?.home_slides?.length || 0;
//     if (page > lastPage) {
//       page = 0;
//     }
//
//     return page;
//   }
//
//   change(event: CarouselPageEvent) {
//     this.page.next(event.page || 0);
//   }
//
//   type(val: any) {
//     console.log('=====', val);
//     return '';
//   }
// }

export class MainScreenComponent implements OnInit, OnDestroy {
  items: IHomeSlide[] = [];
  page = new BehaviorSubject<number>(0);
  hovered = false;
  private timer: any = null;
  private touchStartX = 0;
  private touchStartY = 0;
  private isDragging = false;
  private isVerticalScroll = false;

  constructor(public settings: SettingsStore) {
    if (!this.settings.settings?.home_slides.length) {
      this.settings.$settings.subscribe(s => {
        this.items = s?.home_slides || [];
        this.startAutoRotation();
      });
    } else {
      this.items = this.settings.settings?.home_slides;
      this.startAutoRotation();
    }
  }

  ngOnInit() {
    this.page.subscribe(p => this.initSlide(p));
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }

  private startAutoRotation() {
    this.stopAutoRotation();
    this.timer = setInterval(() => {
      this.goToNext();
    }, (this.items[this.page.value]?.time || 5) * 1000);
  }

  private stopAutoRotation() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  initSlide(p: number) {
    const normalizedPage = this.normalizePageIndex(p);
    if (p !== normalizedPage) {
      setTimeout(() => this.page.next(normalizedPage));
      return;
    }

    const el = document.getElementById('home_slide_' + normalizedPage) as HTMLVideoElement;
    if (el) {
      el.currentTime = 0;
      el.play().catch(e => console.error('Video play error:', e));
    }
  }

  normalizePageIndex(page: number): number {
    if (!this.items.length) return 0;
    return ((page % this.items.length) + this.items.length) % this.items.length;
  }

  goToNext() {
    this.page.next(this.normalizePageIndex(this.page.value + 1));
    this.restartAutoRotation();
  }

  goToPrev() {
    this.page.next(this.normalizePageIndex(this.page.value - 1));
    this.restartAutoRotation();
  }

  restartAutoRotation() {
    this.stopAutoRotation();
    this.startAutoRotation();
  }

  // Обработчики для тач-устройств
  @HostListener('touchstart', ['$event'])
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.isDragging = true;
    this.isVerticalScroll = false;
    this.stopAutoRotation();
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(e: TouchEvent) {
    if (!this.isDragging) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - this.touchStartX;
    const deltaY = touchY - this.touchStartY;

    // Определяем направление свайпа
    if (!this.isVerticalScroll && Math.abs(deltaY) > Math.abs(deltaX)) {
      this.isVerticalScroll = true;
      return;
    }

    if (!this.isVerticalScroll) {
      e.preventDefault(); // Блокируем вертикальный скролл только при горизонтальном свайпе
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(e: TouchEvent) {
    if (!this.isDragging || this.isVerticalScroll) {
      this.isDragging = false;
      this.startAutoRotation();
      return;
    }

    const touchX = e.changedTouches[0].clientX;
    const deltaX = touchX - this.touchStartX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.goToPrev();
      } else {
        this.goToNext();
      }
    }

    this.isDragging = false;
    this.startAutoRotation();
  }

  // Обработчики для мыши (ПК)
  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    if (isMobile) return;
    this.touchStartX = e.clientX;
    this.isDragging = true;
    this.stopAutoRotation();
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (isMobile || !this.isDragging) return;
    e.preventDefault();
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    if (isMobile || !this.isDragging) return;

    const mouseX = e.clientX;
    const deltaX = mouseX - this.touchStartX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        this.goToPrev();
      } else {
        this.goToNext();
      }
    }

    this.isDragging = false;
    this.startAutoRotation();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDragging = false;
    this.startAutoRotation();
  }

  protected readonly isMobile = isMobile;
}
