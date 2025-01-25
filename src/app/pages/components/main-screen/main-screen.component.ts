import {Component} from '@angular/core';
import {isMobile} from '../../../utils/utils';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  templateUrl: './main-screen.component.html',
  imports: [
    NgIf
  ],
  styleUrl: './main-screen.component.scss'
})
export class MainScreenComponent {

  isMobile = isMobile;

}
