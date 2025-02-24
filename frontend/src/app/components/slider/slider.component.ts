import { AfterViewChecked, Component } from '@angular/core';
import { IProject } from '../../types/types';
import { RouterLink } from '@angular/router';
import { NgClass, NgForOf } from '@angular/common';
import { ProjectsStore } from '../../services/ProjectsStore';

@Component( {
  selector: 'app-slider',
  standalone: true,
  imports: [ RouterLink, NgForOf, NgClass ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
} )
export class SliderComponent implements AfterViewChecked {
  constructor(
    public projectsStore: ProjectsStore
  ) {
    projectsStore.projects.subscribe( ( s ) => {
      this.slides = s;
    } )
  }

  ngAfterViewChecked() {
    setTimeout( () => {
      const width = typeof window !== "undefined" ? window.innerWidth : 1300;
      const contWidth = ( typeof document !== "undefined" ? document.querySelector( '.container' )?.clientWidth : 1300 ) || 1300;
      this.width = `${ ( width - contWidth ) / 2 + contWidth }px`;
    }, 100 )
  }

  width = '1300px';

  slides: IProject[] = [];

  isMouseDown = false;
  // @ts-ignore
  startX: number;
  // @ts-ignore
  scrollLeft: number;

  onMouseDown( event: MouseEvent ) {
    this.isMouseDown = true;
    this.startX = event.pageX - ( event.currentTarget as HTMLElement ).offsetLeft;
    this.scrollLeft = ( event.currentTarget as HTMLElement ).scrollLeft;
  }

  onMouseLeave() {
    this.isMouseDown = false;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove( event: MouseEvent ) {
    if ( !this.isMouseDown ) return;
    event.preventDefault();
    const x = event.pageX - ( event.currentTarget as HTMLElement ).offsetLeft;
    const walk = ( x - this.startX ) * 2; // Скорость прокрутки
    ( event.currentTarget as HTMLElement ).scrollLeft = this.scrollLeft - walk;
  }


}
