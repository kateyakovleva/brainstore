import {Component} from '@angular/core';
import {MerchContentComponent} from '../../components/merch-content/merch-content.component';
import {isMobile} from '../../utils/utils';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [
    MerchContentComponent,
    NgIf
  ],
  templateUrl: './merch.component.html',
  styleUrl: '../../styles.scss'
})
export class MerchComponent {

  isMobile = isMobile;

}
