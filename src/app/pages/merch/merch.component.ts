import {Component} from '@angular/core';
import {MerchContentComponent} from '../../components/merch-content/merch-content.component';


@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [
    MerchContentComponent
  ],
  templateUrl: './merch.component.html',
  // styleUrl: './merch.component.scss'
})
export class MerchComponent {

}
