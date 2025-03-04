import { Component } from '@angular/core';
import { MainScreenComponent } from '../components/main-screen/main-screen.component';
import { ServicesComponent } from '../components/services/services.component';
import { ManifestoComponent } from '../components/manifesto/manifesto.component';
import { WorksComponent } from '../components/works/works.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { FormComponent } from '../components/form/form.component';
import { SettingsStore } from '../../services/SettingsStore';

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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
} )
export class HomeComponent {
  constructor(
    public settings: SettingsStore
  ) {
    this.settings.$settings.subscribe( ( s ) => {
      let s1 = s?.state_1.split( '\n' );
      let s2 = s?.state_2.split( '\n' );
      let s3 = s?.state_3.split( '\n' );
      this.items = [
        {
          count: s1?.[ 0 ],
          text: s1?.[ 1 ],
        },
        {
          count: s2?.[ 0 ],
          text: s2?.[ 1 ],
        },
        {
          count: s3?.[ 0 ],
          text: s3?.[ 1 ],
        }
      ];
    } )
  }

  items: any = [];
}
