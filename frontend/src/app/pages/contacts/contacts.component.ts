import {Component} from '@angular/core';
import {FormComponent} from '../components/form/form.component';
import {ManifestoComponent} from '../components/manifesto/manifesto.component';
import {WorksComponent} from '../components/works/works.component';
import {isMobile} from '../../utils/utils';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contacts',
  imports: [
    FormComponent,
    ManifestoComponent,
    WorksComponent,
    NgIf
  ],
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrl: '../team/team.component.scss'
})
export class ContactsComponent {

  isMobile = isMobile;

}
