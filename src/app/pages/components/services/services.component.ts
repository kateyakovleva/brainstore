import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {

  items = [
    {
      black: 'Снимаем видеоролики',
      company: 'Инбриг. ',
      gray: 'Строительная компания, которая возводит частные дома из камня по всему Татарстану'
    },
    {
      black: 'Разрабатываем сайты и приложения',
      company: 'Danaflex. ',
      gray: 'Один из крупнейших производителей гибкой упаковки в мире'
    },
    {
      black: 'Разрабатываем маркетинговые стратегии',
      company: 'Инбриг. ',
      gray: 'Строительная компания, которая возводит частные дома из камня по всему Татарстану'
    },
    {
      black: 'Делаем дизайн и брендинг',
      company: 'Danaflex. ',
      gray: 'Один из крупнейших производителей гибкой упаковки в мире'
    },
    {
      black: 'Проводим исследования',
      company: 'Инбриг. ',
      gray: 'Строительная компания, которая возводит частные дома из камня по всему Татарстану'
    },
    {
      black: 'Придумываем креативные концепции',
      company: 'Danaflex. ',
      gray: 'Danaflex. Один из крупнейших производителей гибкой упаковки в мире'
    }
  ]

}
