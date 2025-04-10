import {Component, ViewEncapsulation} from '@angular/core';
import {NgForOf} from '@angular/common';
import {SettingsStore} from '../../../services/SettingsStore';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    NgForOf,
    MarkdownComponent
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ServicesComponent {

  constructor(
    public settings: SettingsStore
  ) {
  }
}
