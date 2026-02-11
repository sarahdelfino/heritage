import { afterNextRender, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import content from "./content.json";
import { ViewportScroller } from '@angular/common';
import { Contact } from "./contact/contact";
import { Carousel } from "./carousel/carousel";

@Component({
  selector: 'app-root',
  imports: [MatCardModule, RouterLink, Contact, Carousel],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private scroller = inject(ViewportScroller);
  protected readonly title = signal('Heritage Steel Buildings');
  mailingVisible = false;
  bottomContactVisible = false;
 
  differences = content.difference;
  process = content.process;
  footer =  content.footer;

  mailingClick() {
    this.mailingVisible = !this.mailingVisible;
  }

  contactButtonClicked(): void {
    this.bottomContactVisible = !this.bottomContactVisible
    if (this.bottomContactVisible) {
      setTimeout(() => {
        this.scroller.scrollToAnchor('intakeForm', { behavior: 'smooth' });
      }, 200);
    }
  }
}
