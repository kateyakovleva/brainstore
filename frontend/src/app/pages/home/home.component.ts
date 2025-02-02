import {Component} from '@angular/core';
import {MainScreenComponent} from '../components/main-screen/main-screen.component';
import {ServicesComponent} from '../components/services/services.component';
import {ManifestoComponent} from '../components/manifesto/manifesto.component';
import {WorksComponent} from '../components/works/works.component';
import {CustomersComponent} from '../components/customers/customers.component';
import {StatisticsComponent} from '../components/statistics/statistics.component';
import {FormComponent} from '../components/form/form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainScreenComponent,
    ServicesComponent,
    ManifestoComponent,
    WorksComponent,
    CustomersComponent,
    StatisticsComponent,
    FormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
