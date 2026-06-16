import { afterNextRender, Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import content from "./content.json";
import { ViewportScroller } from '@angular/common';
import { Contact } from "./contact/contact";
import { Carousel } from "./carousel/carousel";
import { Faq } from "./faq/faq";
import { analytics } from './firebase.config';
import { logEvent } from 'firebase/analytics';

@Component({
  selector: 'app-root',
  imports: [MatCardModule, RouterLink, Contact, Carousel, Faq],
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

  contactButtonClicked(log: string): void {
    if (analytics) {
      logEvent(analytics, `${log}_button_clicked`);
    }
    this.bottomContactVisible = !this.bottomContactVisible
    if (this.bottomContactVisible) {
      setTimeout(() => {
        this.scroller.scrollToAnchor('intakeForm', { behavior: 'smooth' });
      }, 200);
    }
  }

  designButtonClicked(): void {
    logEvent(analytics, `designer_opened`);
  }

    footerButtonClicked(log: string): void {
    logEvent(analytics, log);
  }

  floatingButtonClicked(): void {
    logEvent(analytics, `promo_button_clicked`);
    this.bottomContactVisible = true;
          setTimeout(() => {
        this.scroller.scrollToAnchor('intakeForm', { behavior: 'smooth' });
      }, 200);
  }
}
