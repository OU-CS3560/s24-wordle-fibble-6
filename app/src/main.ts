import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './nerdle/app.config';
import { AppComponent } from './nerdle/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
