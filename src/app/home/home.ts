import { Component, inject, signal } from '@angular/core';
import { Contact } from "../contact/contact";
import { analytics } from '../firebase.config';
import { logEvent } from 'firebase/analytics';
import content from "../content.json";
import { ViewportScroller } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { RouterLink } from "@angular/router";
import { Process } from "../process/process";

@Component({
  selector: 'app-home',
  imports: [Contact, MatCardModule, RouterLink, Process],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {

    private scroller = inject(ViewportScroller);
  protected readonly title = signal('Heritage Steel Buildings');
  mailingVisible = false;
  bottomContactVisible = false;
 
  buildingTypes = content.buildings;
  differences = content.difference;
  highlights = content.highlights;

  mailingClick() {
    this.mailingVisible = !this.mailingVisible;
  }


  floatingButtonClicked(): void {
    logEvent(analytics, `promo_button_clicked`);
    this.bottomContactVisible = true;
          setTimeout(() => {
        this.scroller.scrollToAnchor('intakeForm', { behavior: 'smooth' });
      }, 200);
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
}
