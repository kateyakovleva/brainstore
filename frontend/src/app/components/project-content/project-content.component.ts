import {AfterViewInit, Component} from '@angular/core';
import {MarkdownComponent} from 'ngx-markdown';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {StatisticsComponent} from '../../pages/components/statistics/statistics.component';
import {WorksComponent} from '../../pages/components/works/works.component';
import {FormComponent} from '../../pages/components/form/form.component';
import {isMobile, videoUrl} from '../../utils/utils';
import {IProject} from '../../types/types';
import {ActivatedRoute} from '@angular/router';
import {ProjectsStore} from '../../services/ProjectsStore';
import {Observable} from 'rxjs';
import {SafePipe} from '../../pipes/SafePipe';

@Component({
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
    SafePipe,
  ],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
})
export class ProjectContentComponent implements AfterViewInit {

  isMobile = isMobile;

  constructor(
    private location: ActivatedRoute,
    private projectsStore: ProjectsStore,
  ) {
    location.params.subscribe((params) => {
      this.project = this.projectsStore.getProject(params['id']);
    });
  }

  project = new Observable<IProject>();

  size = {
    width: 1000,
    height: 600,
  }

  ngAfterViewInit(): void {
    if (typeof window !== undefined) {
      const size = window.innerWidth;
      this.size = {
        width: size,
        height: size / 16 * 9,
      }
    }
  }

  url(url: string) {
    return videoUrl(url);
  }
}


