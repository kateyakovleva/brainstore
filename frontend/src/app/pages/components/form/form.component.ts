import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {isMobile} from '../../../utils/utils';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  isMobile = isMobile;

}
