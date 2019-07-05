import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import {SlideshowComponent} from './slideshow.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SlideshowComponent
  ],
  exports: [
    SlideshowComponent
  ],
  entryComponents: [
    SlideshowComponent
  ]
})
export class SlideshowModule {

  constructor(private injector: Injector) {
    const CustomElm = createCustomElement(SlideshowComponent, { injector });
    customElements.define('slideshow', CustomElm);
  }

}
