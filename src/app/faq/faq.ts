import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import content from "../content.json";
import { analytics } from '../firebase.config';
import { logEvent } from 'firebase/analytics';

@Component({
  selector: 'app-faq',
  imports: [MatExpansionModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
faq = content.faq;

  faqClicked(log: string): void {
    logEvent(analytics, log);
  }
}
