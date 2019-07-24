import {Routes} from '@angular/router';
import {AppComponent} from './app.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: AppComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
