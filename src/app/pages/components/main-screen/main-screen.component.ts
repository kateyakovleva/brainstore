import {Component} from '@angular/core';
import {HomeComponent} from '../../home/home.component';

@Component({
  selector: 'app-main-screen',
  standalone: true,
  imports: [
    HomeComponent
  ],
  templateUrl: './main-screen.component.html',
  styleUrl: './main-screen.component.scss'
})
export class MainScreenComponent {

}
