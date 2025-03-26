import {Component, EventEmitter, Output} from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import {NgForOf} from "@angular/common";
import {SettingsStore} from '../../services/SettingsStore';
import {IMenuItem} from '../../types/types';
import {getLink, toSection} from '../../utils/utils';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {
  constructor(
    private router: Router,
    public settings: SettingsStore,
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.current_location = e.url;
      }
    });
  }

  current_location = '/';

  toSection(item: IMenuItem, event?: any) {
    toSection(item, event);
    this.close.emit();
  }

  getLink(item: IMenuItem) {
    return getLink(item, this.current_location);
  }

  @Output()
  close = new EventEmitter;
}
