import {Component} from '@angular/core';
import {ProjectContentComponent} from '../../components/project-content/project-content.component';
import {NgIf} from '@angular/common';
import {isMobile} from '../../utils/utils';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    ProjectContentComponent,
    NgIf,
  ],
  templateUrl: './project.component.html',
  styleUrl: '../../../styles.scss'
})
export class ProjectComponent {

  protected readonly isMobile = isMobile;
}
