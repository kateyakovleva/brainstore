import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { SettingsStore } from '../../../services/SettingsStore';

@Component( {
  selector: 'app-statistics',
  imports: [
    NgForOf,
    MarkdownComponent
  ],
  standalone: true,
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
} )
export class StatisticsComponent {
  constructor(
    public settings: SettingsStore
  ) {
  }

  getStat() {
    let s1 = this.settings.settings?.state_1.split( '\n' );
    let s2 = this.settings.settings?.state_2.split( '\n' );
    let s3 = this.settings.settings?.state_3.split( '\n' );
    return [
      {
        count: s1?.[ 0 ],
        text: s1?.[ 1 ],
      },
      {
        count: s2?.[ 0 ],
        text: s2?.[ 1 ],
      },
      {
        count: s3?.[ 0 ],
        text: s3?.[ 1 ],
      }
    ];
  }
}
