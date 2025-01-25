import {Component} from '@angular/core';
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
export class SliderComponent {

  slider: ISlide[] = [
    {
      banner: '/images/slider/2.png',
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
      description: 'Строительная компания, которая возводит частные дома из камня по всему Татарстану'
    },
    {
      banner: '/images/slider/1.png',
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
      description: 'Один из крупнейших производителей гибкой упаковки в мире'
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
      description: 'Российский бренд продуктов для здорового питания'
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
