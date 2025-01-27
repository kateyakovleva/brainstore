import {Component} from '@angular/core';
import {IProject} from '../../types/types';
import {MarkdownComponent} from 'ngx-markdown';
import {NgForOf, NgIf} from '@angular/common';
import {StatisticsComponent} from '../../pages/components/statistics/statistics.component';
import {WorksComponent} from '../../pages/components/works/works.component';
import {FormComponent} from '../../pages/components/form/form.component';
import {isMobile} from '../../utils/utils';

@Component({
  selector: 'app-project-content',
  standalone: true,
  imports: [
    MarkdownComponent,
    NgForOf,
    StatisticsComponent,
    WorksComponent,
    FormComponent,
  ],
  templateUrl: './project-content.component.html',
  styleUrl: './project-content.component.scss'
})
export class ProjectContentComponent {

  isMobile = isMobile;

  project: IProject = {
    title: '_ИНБРИГ — Строительная компания,_ которая возводит частные дома из камня по всему Татарстану',
    services: [
      {
        id: 1,
        service: 'креатив'
      },
      {
        id: 2,
        service: 'стратегия'
      },
      {
        id: 3,
        service: 'дизайн'
      },
      {
        id: 4,
        service: 'креатив'
      },
      {
        id: 5,
        service: 'стратегия'
      },
      {
        id: 6,
        service: 'дизайн'
      }
    ],
    tasks: '* — Формирование нового характера и образа бренда\n* — Создание коммуникационной стратегии\n* — Разработка нового нейминга, логотипа и фирменного стиля',
    img_main: '/images/project/1.png',
    results: '+ — Проанализировали рынок, конкурентов и аудиторию\n+ — Разработали позиционирование бренда\n+ — Продумали название, дескриптор, тональность коммуникации\n+ — Разработали логотип и айдентику',
    img_results: '/images/project/2.png',
    research: 'Мы проанализировали конкурентов и их позиционирование — на основе этого составили матрицу, чтобы понять потенциальные территории для нового бренда. Также провели серию глубинных интервью, чтобы выявить боли, страхи и потребности клиентов, сегментировать аудиторию. На основе этого продумали, как именно отстроим бренд от конкурентов и какие сильные стороны хотим подсветить.',
    img_research: '/images/project/3.png',
    naming: 'Мы взяли за основу фигуру Викентия Бригаднова и его принцип заботы о клиенте. К первой части фамилии «бриг» мы добавили частицу «ин», что означает полное включение в процесс. В то же время «бриг» — это еще и вид судна. Так, мы буквально заявляем: мы с клиентом в одной лодке.',
    img_naming: '/images/project/4.png'
  }

}


