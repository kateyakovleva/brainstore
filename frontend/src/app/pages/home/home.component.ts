import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainScreenComponent } from '../components/main-screen/main-screen.component';
import { ServicesComponent } from '../components/services/services.component';
import { ManifestoComponent } from '../components/manifesto/manifesto.component';
import { WorksComponent } from '../components/works/works.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { StatisticsComponent } from '../components/statistics/statistics.component';
import { FormComponent } from '../components/form/form.component';
import { SettingsStore } from '../../services/SettingsStore';
import { AsyncPipe } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-home',
  standalone: true,
  imports: [
    MainScreenComponent,
    ServicesComponent,
    ManifestoComponent,
    WorksComponent,
    CustomersComponent,
    StatisticsComponent,
    FormComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
} )
export class HomeComponent implements OnInit, OnDestroy {
  private subscription?: Subscription;

  constructor(
    public settings: SettingsStore,
    private title: Title,
    private meta: Meta
  ) {
  }

  ngOnInit(): void {
    // Устанавливаем мета-теги при первой загрузке, если настройки уже загружены
    if (this.settings.settings) {
      this.updateMetaTags(this.settings.settings);
    }

    // Подписываемся на изменения настроек
    this.subscription = this.settings.$settings.subscribe(settings => {
      if (settings) {
        this.updateMetaTags(settings);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateMetaTags(settings: any): void {
    // Устанавливаем title
    if (settings.meta_title) {
      this.title.setTitle(settings.meta_title);
    }

    // Устанавливаем meta description
    if (settings.meta_description) {
      this.meta.updateTag({ name: 'description', content: settings.meta_description });
    } else {
      this.meta.removeTag("name='description'");
    }

    // Устанавливаем meta keywords
    if (settings.meta_keywords) {
      this.meta.updateTag({ name: 'keywords', content: settings.meta_keywords });
    } else {
      this.meta.removeTag("name='keywords'");
    }
  }
}
