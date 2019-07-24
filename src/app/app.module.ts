import {HttpClientModule} from '@angular/common/http';

import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HoneySlideshowModule} from './slideshow/honey-slideshow.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    HoneySlideshowModule
  ],
  declarations: [
    AppComponent,
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
