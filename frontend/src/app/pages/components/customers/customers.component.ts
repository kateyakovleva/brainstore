import {Component} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {SettingsStore} from '../../../services/SettingsStore';
import {WrapShortWordsPipe} from "../../../pipes/wrapShortWords";

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    WrapShortWordsPipe
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  constructor(
    public settings: SettingsStore
  ) {
  }

  currentIndex = 0;

  showDescription(index: number) {
    this.currentIndex = index;
  }
}
