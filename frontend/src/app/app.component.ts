import { AfterViewInit, Component } from '@angular/core';

@Component( {
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
} )
export class AppComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const currentHour = new Date().getHours();

    if ( currentHour <= 6 && currentHour > 18 ) {
      document.documentElement.setAttribute( 'data-theme', 'dark' );
    }
  }

}
