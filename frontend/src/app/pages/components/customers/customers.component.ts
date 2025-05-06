import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { SettingsStore } from '../../../services/SettingsStore';

@Component( {
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
} )
export class CustomersComponent {
  constructor(
    public settings: SettingsStore
  ) {
  }

  currentIndex: number | null = null;

  showDescription( index: number ) {
    this.currentIndex = index;
  }

  hideDescription() {
    this.currentIndex = null;
  }
}
