import {Component} from '@angular/core';
import {ProjectContentComponent} from '../../components/project-content/project-content.component';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ProjectContentComponent,
  ],
  templateUrl: './project.component.html',
  styleUrl: '../../styles.scss'
})
export class ProjectComponent {

}
