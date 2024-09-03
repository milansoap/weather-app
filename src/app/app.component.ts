import { Component, ViewEncapsulation } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';

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
  private unsubscribe$ = new Subject<void>();

  constructor(private translate: TranslateService, private loadingService: LoadingService) {
    this.translate.addLangs(['en', 'sl']);
    this.translate.setDefaultLang('en');

    this.loading$.pipe(takeUntil(this.unsubscribe$)).subscribe();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnDestroy(): void {
    // Emit and complete unsubscribe$ to ensure cleanup
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
