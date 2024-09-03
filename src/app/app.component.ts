import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Make the app.component.css global so we can override the body tag
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'weather-app';
}
