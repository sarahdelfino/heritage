import { Component } from '@angular/core';
import aboutContent from './aboutContent.json';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about-page.html',
  styleUrl: './about-page.scss',
})
export class AboutPage {
  values = aboutContent.values;
  workStyle = aboutContent.workStyle;
  buildingUses = aboutContent.buildingUses;
  faqs = aboutContent.faqs;
  steps = aboutContent.steps;

  contactButtonClicked(source: string): void {
    console.log('Contact clicked:', source);

    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}