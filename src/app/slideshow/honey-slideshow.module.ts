import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { createCustomElement } from '@angular/elements';
import {HoneySlideshowComponent} from './honey-slideshow.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    HoneySlideshowComponent
  ],
  exports: [
    HoneySlideshowComponent
  ],
  entryComponents: [
    HoneySlideshowComponent
  ]
})
export class HoneySlideshowModule {

  constructor(private injector: Injector) {
    const CustomElm = createCustomElement(HoneySlideshowComponent, { injector });
    customElements.define('honey-slideshow', CustomElm);
  }

}
