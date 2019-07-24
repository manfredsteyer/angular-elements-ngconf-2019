import {Component, Input, SecurityContext} from '@angular/core';
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

  isPresenting = false;
  protected curSlide = 0;

  /**
   * [
   * {
   *    "slideURL": "url des slide",
   *    "audioURL": "url des audio"
   * }
   * ]
   */
  @Input() slides: Slide[];

  constructor(private sanitizer: DomSanitizer) {

  }


  protected gotoSlide(index): void {
    if (index < 0 || index > (this.slides.length - 1)) {
      return;
    }
    this.curSlide = index;
    this.updateView();
  }

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
