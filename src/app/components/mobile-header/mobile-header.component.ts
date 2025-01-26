import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-mobile-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {
  toSection(name: string) {
    setTimeout(() => {
      let top = (document.querySelector('app-' + name) as HTMLElement)?.offsetTop - 95;
      window.scrollTo({top: top, behavior: 'smooth'});

      this.close.emit();
    }, 100)
  }

  @Output()
  close = new EventEmitter;
}
