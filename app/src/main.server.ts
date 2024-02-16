import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './nerdle/app.component';
import { config } from './nerdle/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
