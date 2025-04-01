import {Component} from '@angular/core';
import {ManifestoComponent} from '../components/manifesto/manifesto.component';
import {FormComponent} from '../components/form/form.component';
import {WorksComponent} from '../components/works/works.component';
import {SettingsStore} from '../../services/SettingsStore';
import {MarkdownComponent} from 'ngx-markdown';
import {WrapShortWordsPipe} from "../../pipes/wrapShortWords";

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html',
  imports: [
    ManifestoComponent,
    FormComponent,
    WorksComponent,
    MarkdownComponent,
    WrapShortWordsPipe
  ],
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  constructor(
    public settings: SettingsStore,
  ) {
  }
}
