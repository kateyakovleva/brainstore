import {Component} from '@angular/core';
import {ICard} from '../../types/types';
import {NgForOf, NgIf} from '@angular/common';
import {isMobile} from '../../utils/utils';

@Component({
  selector: 'app-merch-content',
  imports: [
    NgForOf,
    NgIf
  ],
  standalone: true,
  templateUrl: './merch-content.component.html',
  styleUrl: './merch-content.component.scss'
})
export class MerchContentComponent {

  items: ICard[] = [
    {
      img: '/images/merch/m7.png',
      title: 'Scarf 2025.',
      status: 'Sold Out'
    },
    {
      img: '/images/merch/m4.png',
      title: 'Carbine 2025.',
      status: 'Sold Out'
    },
    {
      img: '/images/merch/m2.png',
      title: 'Longsleeve White 2025.',
      status: 'Sold Out'
    },
    {
      img: '/images/merch/m3.png',
      title: 'Capsule Merch',
      status: 'Sold Out'
    },
    {
      img: '/images/merch/m1.png',
      title: 'Сup 2025.',
      status: 'Sold Out'
    },
    {
      img: '/images/merch/m6.png',
      title: 'Longsleeve Black 2025.',
      status: 'Sold Out'
    },
    {
      img: '/images/merch/m5.png',
      title: 'Socks 2025.',
      status: 'Sold Out'
    }
  ]

  protected readonly isMobile = isMobile;
}
