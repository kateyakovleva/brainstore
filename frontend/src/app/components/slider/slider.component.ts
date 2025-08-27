import {Component, OnInit} from '@angular/core';
import {IProject} from '../../types/types';
import {RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ProjectsStore} from '../../services/ProjectsStore';
import {MarkdownComponent} from 'ngx-markdown';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterLink, NgForOf, NgClass, MarkdownComponent, NgIf],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit {

  constructor(
    public projectsStore: ProjectsStore
  ) {
    projectsStore.projects.subscribe((s) => {
      this.slides = s;
    })
  }

  ngOnInit() {
    if (!this.inited) {
      setTimeout(() => {
        const width = typeof window !== "undefined" ? window.outerWidth : 1300;
        const contWidth = (typeof document !== "undefined" ? document.querySelector('.container')?.clientWidth : 1300) || 1300;
        this.width = `${(width - contWidth) / 2 + contWidth}px`;
      }, 100);

      this.inited = true;
    }
  }

  inited: boolean = false;

  width = '1300px';

  slides: IProject[] = [];

  isMouseDown = false;
  // @ts-ignore
  startX: number;
  // @ts-ignore
  scrollLeft: number;

  onMouseDown(event: MouseEvent) {
    this.isMouseDown = true;
    this.startX = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    this.scrollLeft = (event.currentTarget as HTMLElement).scrollLeft;
  }

  onMouseLeave() {
    this.isMouseDown = false;
  }

  onMouseUp() {
    this.isMouseDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isMouseDown) return;
    event.preventDefault();
    const x = event.pageX - (event.currentTarget as HTMLElement).offsetLeft;
    const walk = (x - this.startX) * 2; // Скорость прокрутки
    (event.currentTarget as HTMLElement).scrollLeft = this.scrollLeft - walk;
  }

  openUrl(project: IProject) {
    window.open(this.getUrl(project), '_blank');
  }

  getUrl(project: IProject) {
    if(project.seo_alias && project.seo_alias.startsWith('http')) {
      return project.seo_alias;
    }
    return `/projects/${project.seo_alias || project.id}`;
  }
}
