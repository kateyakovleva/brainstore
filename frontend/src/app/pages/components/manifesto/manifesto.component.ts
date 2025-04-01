import {Component} from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';
import {SettingsStore} from '../../../services/SettingsStore';
import {WrapShortWordsPipe} from "../../../pipes/wrapShortWords";

@Component({
  selector: 'app-manifesto',
  standalone: true,
  imports: [
    MarkdownComponent,
    WrapShortWordsPipe
  ],
  templateUrl: './manifesto.component.html',
  styleUrl: './manifesto.component.scss'
})
export class ManifestoComponent {
  constructor(
    public settings: SettingsStore
  ) {
  }
}
