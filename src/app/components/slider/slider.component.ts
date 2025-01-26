import {AfterViewInit, Component} from '@angular/core';
import {ISlide} from '../../types/types';
import {RouterLink} from '@angular/router';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterLink, NgForOf, NgClass],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements AfterViewInit {
  ngAfterViewInit() {
    const width = typeof window !== "undefined" ? window.innerWidth : 1300;
    const contWidth = (typeof document !== "undefined" ? document.querySelector('.container')?.clientWidth : 1300) || 1300;
    this.width = `${(width - contWidth) / 2 + contWidth}px`;
  }

  width = '1300px';

  slider: ISlide[] = [
    {
      banner: '/images/slider/1.png',
      services: [
        {
          id: 1,
          service: 'Креатив'
        },
        {
          id: 2,
          service: 'Стратегия'
        }
      ],
      company: 'Инбриг',
      description: 'Строительная компания, которая возводит частные дома из камня по всему Татарстану',
      background: '#0827FE'

    },
    {
      banner: '/images/slider/2.png',
      services: [
        {
          id: 3,
          service: 'Креатив'
        },
        {
          id: 4,
          service: 'Стратегия'
        }
      ],
      company: 'Danaflex',
      description: 'Один из крупнейших производителей гибкой упаковки в мире',
      background: '#090909'
    },
    {
      banner: '/images/slider/3.png',
      services: [
        {
          id: 5,
          service: 'Креатив'
        },
        {
          id: 6,
          service: 'Стратегия'
        }
      ],
      company: 'ВкусВилл',
      description: 'Российский бренд продуктов для здорового питания',
      background: '#F1F1F1'
    },
  ]

  isMouseDown = false;
  // @ts-ignore
  startX: number;
  // @ts-ignore
  scrollLeft: number;

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.startX = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    this.scrollLeft = (event.currentTarget as HTMLElement).scrollLeft;
  }

  onMouseLeave() {
    this.isMouseDown = false;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;
    event.preventDefault();
    const x = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    const walk = (x - this.startX) * 2; // Скорость прокрутки
    (event.currentTarget as HTMLElement).scrollLeft = this.scrollLeft - walk;
  }


}
