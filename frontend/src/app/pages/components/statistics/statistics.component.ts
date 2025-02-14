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
      count: '177',
      text: 'городов присутствия'
    },
    {
      count: '66,3 млн',
      text: 'ежедневный охват'
    },
    {
      count: '36 268',
      text: 'поверхностей по всей стране'
    }
  ]

}
