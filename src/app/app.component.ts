import {Component} from '@angular/core';

@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  SLIDES = [
    {
      slideURL: 'https://raw.githubusercontent.com/FunThomas424242/angular-webcomponents.template/master/README.md',
      audioURL: 'slide1.mp3'
    }
    , {
      slideURL: 'https://raw.githubusercontent.com/FunThomas424242/jar-install-plugin/master/CHANGES.md',
      audioURL: 'slide2.mp3'
    }
  ];

  constructor() {
  }
}

