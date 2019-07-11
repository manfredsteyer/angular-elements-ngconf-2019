import {Component} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  protected SLIDES = [
    {
      slideURL: 'https://raw.githubusercontent.com/FunThomas424242/angular-webcomponents.template/master/README.md',
      audioURL: 'slide1.mp3'
    }
    , {
      slideURL: 'https://raw.githubusercontent.com/FunThomas424242/jar-install-plugin/master/CHANGES.md',
      audioURL: 'slide2.mp3'
    }
  ];
}


