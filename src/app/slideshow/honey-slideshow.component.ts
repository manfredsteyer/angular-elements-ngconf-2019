import {AfterViewInit, Component, Input, Output, SecurityContext} from '@angular/core';
import {parse} from 'marked';
import {DomSanitizer} from '@angular/platform-browser';


interface Slide {

  slideURL;

}


@Component({
  selector: 'app-honey-slideshow',
  templateUrl: './honey-slideshow.component.html',
  styleUrls: ['./honey-slideshow.component.css']
})
export class HoneySlideshowComponent {

  protected isPresenting = false;
  protected curSlide = 0;

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


  protected nextSlide(): void {
    if (this.curSlide >= (this.slides.length - 1)) {
      return;
    }
    this.curSlide++;
    this.updateView();
  }

  protected prevSlide(): void {
    if (this.curSlide < 1) {
      return;
    }
    this.curSlide--;
    this.updateView();
  }


  public updateView = () => {
    this.isPresenting = true;

    // console.log(`slideContent${this.slides[0]['slideURL']}`);
    const fetchedData: Promise<string> = fetch(this.slides[this.curSlide].slideURL)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.text() as Promise<string>;
      })
      .then((data: string) => {
        const htmlContent = parse(data);
        const sanifiedHtmlContent = this.sanitizer.sanitize(SecurityContext.HTML, htmlContent);

        const element: HTMLElement = document.getElementById('slide-frame');
        element.innerHTML = sanifiedHtmlContent;
        return data;
      });
  };

}
