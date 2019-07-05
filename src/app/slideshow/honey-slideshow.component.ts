import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-honey-slideshow',
  templateUrl: './honey-slideshow.component.html'
})
export class HoneySlideshowComponent implements OnInit {
  @Input() slideURL: string;
  @Input() slideTitle: string;

  // data for chart
  slides: object = {};

  ngOnInit() {
    this.slides = [
      {
        url: this.slideURL,
        title: this.slideTitle
      }
    ];
  }
}
