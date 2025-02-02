import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {MarkdownModule, MARKED_OPTIONS, provideMarkdown} from "ngx-markdown";
import {AppComponent} from './app.component';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true
        },
      }
    }),
    HeaderComponent,
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideMarkdown()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
