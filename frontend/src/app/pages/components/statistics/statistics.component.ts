import { Component, Input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';

@Component( {
  selector: 'app-statistics',
  imports: [
    NgForOf,
    MarkdownComponent,
    NgIf
  ],
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
} )
export class StatisticsComponent {
  @Input()
  items: IStatItem[] = [];

  @Input()
  title?: string = '';
}

export interface IStatItem {
  count: string;
  text: string;
}
