import { Component } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component( {
  selector: 'app-manifesto',
  standalone: true,
  imports: [
    MarkdownComponent
  ],
  templateUrl: './manifesto.component.html',
  styleUrl: './manifesto.component.scss'
} )
export class ManifestoComponent {

}
