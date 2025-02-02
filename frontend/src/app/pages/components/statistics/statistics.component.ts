import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

@Component( {
  selector: 'app-statistics',
  imports: [
    NgForOf
  ],
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
} )
export class StatisticsComponent {

  stat = [
    {
      count: '136',
      text: 'городов присутствия'
    },
    {
      count: 'ТОП-2',
      text: 'среди операторов наружной рекламы в России'
    },
    {
      count: '30 241',
      text: 'поверхность по всей стране'
    }
  ]

}
