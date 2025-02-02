import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {isMobile} from '../../utils/utils';
import {MobileHeaderComponent} from '../mobile-header/mobile-header.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MobileHeaderComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isMobile = isMobile;

  mobile_header = false;

  openMobileHeader() {
    this.mobile_header = !this.mobile_header;
  }

  toSection(name: string) {
    let top = (document.querySelector('app-' + name) as HTMLElement)?.offsetTop - 95;
    document.scrollingElement?.scrollTo({top: top, behavior: 'smooth'});
  }

}
