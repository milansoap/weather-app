import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Make the app.component.css global so we can override the body tag
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title: string = 'weather-app';

  loading$ = this.loadingService.loading$;

  constructor(private translate: TranslateService, private loadingService: LoadingService) {
    this.translate.addLangs(['en', 'sl']);
    this.translate.setDefaultLang('en');
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
