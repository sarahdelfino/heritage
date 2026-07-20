import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAdsService {
  trackQuoteRequestConversion(): void {
    if (
      typeof window === 'undefined' ||
      typeof window.gtag !== 'function'
    ) {
      console.warn('Google tag is not available.');
      return;
    }

    window.gtag('event', 'conversion', {
      send_to: 'AW-18321254468/GJMNCIqyhNMcEMTQoKBE',
      event_callback: () => {
        console.log('Google Ads quote conversion sent.');
      },
      event_timeout: 2000,
    });
  }
}