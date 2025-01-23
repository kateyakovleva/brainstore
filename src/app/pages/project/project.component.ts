import {Component} from '@angular/core';
import {MerchContentComponent} from '../../components/merch-content/merch-content.component';
import {ProjectContentComponent} from '../../components/project-content/project-content.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    MerchContentComponent,
    ProjectContentComponent,
  ],
  templateUrl: './project.component.html',
  // styleUrl: './project.component.scss'
})
export class ProjectComponent {

}
