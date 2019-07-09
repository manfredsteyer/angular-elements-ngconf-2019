import {AfterViewInit, Component, Input, Output} from '@angular/core';
import {parse} from 'marked';


interface Slide {

  slideURL;

}


@Component({
  selector: 'app-honey-slideshow',
  templateUrl: './honey-slideshow.component.html'
})
export class HoneySlideshowComponent implements AfterViewInit {

  /**
   * [
   * {
   *    "slideURL": "url des slide",
   *    "audioURL": "url des audio"
   * }
   * ]
   */
  @Input() slides: Slide[];


  public compute = ($event) => {
    // console.log(`slideContent${this.slides[0]['slideURL']}`);
    const fetchedData: Promise<string> = fetch(this.slides[0].slideURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text() as Promise<string>;
      })
      .then((data: string) => {
        const text = parse(data);
        console.log('###Text:>' + text + '<');
        const element: HTMLElement = document.getElementById('slide-frame');
        element.innerHTML = text;
        return data;
      });
  };

  // data for chart
  // slides: object = {};

  ngAfterViewInit() {


  }
}
