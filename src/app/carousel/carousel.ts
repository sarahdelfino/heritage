import { Component, ElementRef, Input, OnInit, QueryList, signal } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import content from "../content.json";
import { analytics } from '../firebase.config';
import { logEvent } from 'firebase/analytics';

@Component({
  selector: 'app-carousel',
  imports: [CarouselModule],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel implements OnInit {
@Input() type: string = "";
@Input() autoPlay: boolean = true;

  images = signal<any[]>([]);
  title: string = '';
  slideIndex = 0;


  ngOnInit(): void {
    if (this.type === 'architecture') {
      this.title = content.carousel[0].title;
      this.images.set(content.carousel[0].images);
    } else {
      this.title = content.carousel[1].title;
      this.images.set(content.carousel[1].images);
    }
    console.log(this.images());
  }

  carouselClicked(log: string): void {
    logEvent(analytics, log);
  }
}
