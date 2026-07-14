import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GoogleAdsService {
  trackConversion(sendTo: string, value?: number): void {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
      console.warn('Google tag is not available.');
      return;
    }

    window.gtag('event', 'conversion', {
      send_to: sendTo,
      ...(value !== undefined
        ? {
            value,
            currency: 'USD',
          }
        : {}),
    });
  }
}