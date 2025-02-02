import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { StatisticsComponent } from '../../pages/components/statistics/statistics.component';
import { WorksComponent } from '../../pages/components/works/works.component';
import { FormComponent } from '../../pages/components/form/form.component';
import { isMobile } from '../../utils/utils';
import { IProject } from '../../types/types';
import { ActivatedRoute } from '@angular/router';
import { ProjectsStore } from '../../services/ProjectsStore';
import { Observable } from 'rxjs';

@Component( {
  selector: 'app-project-content',
  standalone: true,
  imports: [
    MarkdownComponent,
    NgForOf,
    StatisticsComponent,
    WorksComponent,
    FormComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
} )
export class ProjectContentComponent {

  isMobile = isMobile;

  constructor(
    private location: ActivatedRoute,
    private projectsStore: ProjectsStore,
  ) {
    location.params.subscribe( ( params ) => {
      this.project = this.projectsStore.getProject( params[ 'id' ] );
    } );
  }

  project = new Observable<IProject>();
}


