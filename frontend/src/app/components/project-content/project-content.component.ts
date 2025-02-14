import { AfterViewInit, Component } from '@angular/core';
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
import { SafePipe } from '../../pipes/SafePipe';

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
    SafePipe,
  ],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
} )
export class ProjectContentComponent implements AfterViewInit {

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

  size = {
    width: 1000,
    height: 600,
  }

  ngAfterViewInit(): void {
    if ( typeof window !== undefined ) {
      this.size = {
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.9,
      }
    }
  }

  url( url: string ) {
    if ( url.indexOf( 'rutube.ru' ) !== -1 ) {
      return url.replace( 'https://rutube.ru/video/', 'https://rutube.ru/play/embed/' )
    }

    if ( url.indexOf( 'vimeo.com' ) ) {
      return url.replace( /https:\/\/vimeo.com\/([^\/]+)\/([^\/]+)/, 'https://player.vimeo.com/video/$1?h=$2' )
    }
    //https://vimeo.com/1053368072/7b446baf6d

    //https://player.vimeo.com/video/1053368072?h=7b446baf6d

    return url;
  }
}


