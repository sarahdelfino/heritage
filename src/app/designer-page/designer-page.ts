import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { analytics } from '../firebase.config';
import { logEvent } from 'firebase/analytics';

@Component({
  selector: 'app-designer-page',
  standalone: true,
  templateUrl: './designer-page.html',
  styleUrl: './designer-page.scss',
})
export class DesignerPage {
  readonly designerUrl = 'https://heritage3d.actbuildingsystems.com';

  openDesigner(): void {
    logEvent(analytics, 'launched_designer');
    window.open(this.designerUrl, '_blank', 'noopener,noreferrer');
  }
}