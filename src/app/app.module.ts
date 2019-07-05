import {HttpClientModule} from '@angular/common/http';

import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {HomeComponent} from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardTileModule } from './dashboard/dashboard-tile/dashboard-tile.module';

@NgModule({
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(APP_ROUTES),
      DashboardTileModule,
   ],
   declarations: [
      AppComponent,
      HomeComponent,
   ],
   providers: [],
   schemas: [
      CUSTOM_ELEMENTS_SCHEMA
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
}
