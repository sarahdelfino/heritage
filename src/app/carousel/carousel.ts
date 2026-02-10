import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, viewChild, ViewChild, ViewChildren } from '@angular/core';
import content from "../content.json";

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel implements OnInit, AfterViewInit {

@ViewChildren('cImg') cImages!: QueryList<ElementRef>;
@ViewChildren('arrow') arrows!: QueryList<ElementRef>;
  @Input() type: string = "";

  title: string = '';
  images: string[] = [];
  slideIndex = 0;


  ngOnInit(): void {
    if (this.type === 'architecture') {
      this.title = content.carousel[0].title;
      this.images = content.carousel[0].images;
    } else {
      this.title = content.carousel[1].title;
      this.images = content.carousel[1].images;
    }
  }

  ngAfterViewInit(): void {
    if (this.type === 'floorPlans') {
      this.arrows.forEach(item => {
        item.nativeElement.classList.add('arrow-override');
      });
    }
    this.cImages.forEach(item => {
      if (item.nativeElement.id != this.slideIndex) {
        item.nativeElement.style.display = 'none';
        console.log(item.nativeElement)
      }
    });
  }

  prevImage() {
      let currentImg = this.cImages.find(item => item.nativeElement.id == this.slideIndex);
      currentImg!.nativeElement.style.display = 'none';
    if(this.slideIndex > 0) {
      this.slideIndex -= 1;
      let prevImg = this.cImages.find(item => item.nativeElement.id == this.slideIndex);
      prevImg!.nativeElement.style.display = 'block';
    } else {
    this.slideIndex = this.cImages.length - 1;
      let lastImg = this.cImages.find(item => item.nativeElement.id == this.slideIndex);
      lastImg!.nativeElement.style.display = 'block';
    }

  }

  nextImage() {
      let currentImg = this.cImages.find(item => item.nativeElement.id == this.slideIndex);
      currentImg!.nativeElement.style.display = 'none';
        if(this.slideIndex < this.cImages.length -1) {
      this.slideIndex += 1;
      let nextImg = this.cImages.find(item => item.nativeElement.id == this.slideIndex);
      nextImg!.nativeElement.style.display = 'block';
    } else {
    this.slideIndex = 0;
      let firstImg = this.cImages.find(item => item.nativeElement.id == this.slideIndex);
      firstImg!.nativeElement.style.display = 'block';
    }
  }
}
