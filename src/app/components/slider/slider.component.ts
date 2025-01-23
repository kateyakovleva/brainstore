import {Component, ViewEncapsulation} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {ISlide} from '../../types/types';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {NgScrollbar} from 'ngx-scrollbar';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CarouselModule, NgForOf, RouterLink, NgScrollbar],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent {

  slider: ISlide[] = [
    {
      banner: '/images/slider/2.png',
      services: [
        {
          id: 1,
          service: 'креатив'
        },
        {
          id: 2,
          service: 'стратегия'
        }
      ],
      company: 'Инбриг',
      description: 'Строительная компания, которая возводит частные дома из камня по всему Татарстану'
    },
    {
      banner: '/images/slider/1.png',
      services: [
        {
          id: 3,
          service: 'креатив'
        },
        {
          id: 4,
          service: 'стратегия'
        }
      ],
      company: 'Danaflex',
      description: 'Один из крупнейших производителей гибкой упаковки в мире'
    },
    {
      banner: '/images/slider/3.png',
      services: [
        {
          id: 5,
          service: 'креатив'
        },
        {
          id: 6,
          service: 'стратегия'
        }
      ],
      company: 'ВкусВилл',
      description: 'Российский бренд продуктов для здорового питания'
    },
  ]

  page = 0;

  protected readonly Math = Math;
}
