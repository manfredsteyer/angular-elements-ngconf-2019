import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html'
})
export class SlideshowComponent implements OnInit {
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
