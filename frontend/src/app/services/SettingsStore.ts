import {Injectable} from '@angular/core';
import {AppClient} from './AppClient';
import {ISettings} from '../types/types';
import {Subject} from 'rxjs';
import {IStatItem} from '../pages/components/statistics/statistics.component';
import {isMobile} from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class SettingsStore {
  constructor(
    private http: AppClient,
  ) {
    this.http.get<ISettings>('settings').subscribe((s) => {
      s.home_slides = s.home_slides.map((s, i) => {
        if (isMobile) {
          s.image_url = s.image_mob_url;
          s.video_url = s.video_mob_url;
        }
        return ({...s, index: i})
      });
      s.menu = s.header_menu.filter(m => m.data.status).map(m => m.data);

      let s1 = s?.state_1.split('\n');
      let s2 = s?.state_2.split('\n');
      let s3 = s?.state_3.split('\n');
      this.items = [
        {
          count: s1?.[0],
          text: s1?.[1],
        },
        {
          count: s2?.[0],
          text: s2?.[1],
        },
        {
          count: s3?.[0],
          text: s3?.[1],
        }
      ];

      this.settings = s;
      this.$settings.next(s);
    })
  }

  items: IStatItem[] = [];

  settings: ISettings | null = null;

  $settings = new Subject<ISettings | null>();
}
