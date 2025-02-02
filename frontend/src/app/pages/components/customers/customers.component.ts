import {Component} from '@angular/core';
import {ICustomer} from '../../../types/types';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {


  customers: ICustomer[] = [
    {
      company: 'Сбербанк',
      logo: '/images/customers-logo/sber.png',
      description: 'Кредиты и вклады, ипотека, дебетовые и кредитные карты и другие банковские услуги для частных клиентов.',
      services: [
        {
          id: 1,
          service: 'креатив /'
        },
        {
          id: 2,
          service: 'бренд-платформа /'
        },
        {
          id: 3,
          service: 'имиджевый видео-ролик'
        }
      ],
      showDescription: false
    },
    {
      company: 'Мега',
      logo: '/images/customers-logo/sber.png',
      description: 'Кредиты и вклады, ипотека, дебетовые и кредитные карты и другие банковские услуги для частных клиентов.',
      services: [
        {
          id: 4,
          service: 'креатив /'
        },
        {
          id: 5,
          service: 'бренд-платформа /'
        },
        {
          id: 6,
          service: 'имиджевый видео-ролик /'
        },
        {
          id: 7,
          service: 'креатив /'
        },
        {
          id: 8,
          service: 'бренд-платформа'
        }
      ],
      showDescription: false
    },
    {
      company: 'danaflex',
      logo: '/images/customers-logo/sber.png',
      description: 'Кредиты и вклады, ипотека, дебетовые и кредитные карты и другие банковские услуги для частных клиентов.',
      services: [
        {
          id: 9,
          service: 'креатив /'
        },
        {
          id: 10,
          service: 'бренд-платформа /'
        },
        {
          id: 11,
          service: 'имиджевый видео-ролик /'
        },
        {
          id: 12,
          service: 'креатив /'
        },
        {
          id: 13,
          service: 'бренд-платформа'
        }
      ],
      showDescription: false
    },
  ]

  showDescription(customer: any) {
    customer.showDescription = true;
  }

  hideDescription(customer: any) {
    customer.showDescription = false;
  }
}
