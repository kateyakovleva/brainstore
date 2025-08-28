import { Component } from '@angular/core';
import { MainScreenComponent } from '../components/main-screen/main-screen.component';
import { ServicesComponent } from '../components/services/services.component';
import { ManifestoComponent } from '../components/manifesto/manifesto.component';
import { WorksComponent } from '../components/works/works.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { FormComponent } from '../components/form/form.component';
import { SettingsStore } from '../../services/SettingsStore';
import { AsyncPipe } from '@angular/common';

@Component( {
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
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
} )
export class HomeComponent {
  constructor(
    public settings: SettingsStore
  ) {

  }
}
