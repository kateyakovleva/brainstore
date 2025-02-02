import { Injectable } from '@angular/core';
import { AppClient } from './AppClient';
import { map, Observable } from 'rxjs';
import { IProject, IProjects } from '../types/types';

@Injectable( {
  providedIn: 'root'
} )
export class ProjectsStore {
  constructor(
    private http: AppClient,
  ) {
    this.projects = this.http.get<IProjects>( 'projects' ).pipe( map( s => s.data ) )
  }

  projects = new Observable<IProject[]>();

  getProject( id: number | string ) {
    return this.http.get<IProject>( `projects/${ id }` );
  }
}
