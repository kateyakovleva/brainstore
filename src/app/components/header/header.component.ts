import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  toSection(name: string) {
    let top = (document.querySelector('app-' + name) as HTMLElement)?.offsetTop - 95;
    window.scrollTo({top: top, behavior: 'smooth'});
  }

}
