import {AfterViewInit, Component, Input, Output, SecurityContext} from '@angular/core';
import {parse} from 'marked';
import {DomSanitizer} from '@angular/platform-browser';


interface Slide {

  slideURL;

}


@Component({
  selector: 'app-honey-slideshow',
  templateUrl: './honey-slideshow.component.html'
})
export class HoneySlideshowComponent implements AfterViewInit {

  protected isPresenting = false;

  constructor(private sanitizer: DomSanitizer) {

  }


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
    this.isPresenting = true;

    // console.log(`slideContent${this.slides[0]['slideURL']}`);
    const fetchedData: Promise<string> = fetch(this.slides[0].slideURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text() as Promise<string>;
      })
      .then((data: string) => {
        const htmlContent = parse(data);
        const sanifiedHtmlContent = this.sanitizer.sanitize(SecurityContext.HTML, htmlContent);

        console.log('###Text:>' + sanifiedHtmlContent + '<');
        const element: HTMLElement = document.getElementById('slide-frame');
        element.innerHTML = sanifiedHtmlContent;
        return data;
      });
  };

  // data for chart
  // slides: object = {};

  ngAfterViewInit() {


  }
}
