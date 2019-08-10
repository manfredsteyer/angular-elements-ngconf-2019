import {AfterViewInit, Component, Input, SecurityContext} from '@angular/core';
import {parse} from 'marked';
import {DomSanitizer} from '@angular/platform-browser';


export interface Slide {

  slideURL;
  audioURL;

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

  public getCurrentSlide(): number {
    return this.curSlide;
  }

  public getSlides(): Slide[] {
    if (this.isPresenting) {
      return this.slides;
    } else {
      return [];
    }
  }

  protected gotoSlide(index): void {
    if (index < 0 || index > (this.slides.length - 1)) {
      return;
    }
    this.curSlide = index;
    this.updateView();
  }

  protected nextSlide(): void {
    if (this.getCurrentSlide() >= (this.slides.length - 1)) {
      return;
    }
    this.curSlide++;
    this.updateView();
  }

  protected prevSlide(): void {
    if (this.getCurrentSlide() < 1) {
      return;
    }
    this.curSlide--;
    this.updateView();
  }


  public updateView(): void {
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
      }).catch(() => {
        throw new Error('das sollte nixe passieren');
      });
  }

  public getNavClass(slideIndex: number): string {
    return this.getCurrentSlide() === slideIndex ? 'current' : 'notcurrent';
  }
}
