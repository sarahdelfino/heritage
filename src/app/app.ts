import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { Navbar } from "./navbar/navbar";
import content from "./content.json";
import { analytics } from './firebase.config';
import { logEvent } from 'firebase/analytics';
import { Home } from './home/home';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { SeoService } from './seo-service';

@Component({
  selector: 'app-root',
  imports: [MatCardModule, RouterLink, Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  footer =  content.footer;

      footerButtonClicked(log: string): void {
    logEvent(analytics, log);
  }

    private readonly router = inject(Router);
  private readonly seoService = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd =>
            event instanceof NavigationEnd
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        const route = this.getDeepestRoute(
          this.router.routerState.snapshot.root
        );

        const staticSeoKey = route.data['seo'] as string | undefined;
        const slug = route.paramMap.get('slug');

        // Static pages use data.seo.
        // Dynamic building pages use the URL slug.
        const seoKey = staticSeoKey ?? slug;

        if (!seoKey) {
          console.warn(`No SEO key found for ${event.urlAfterRedirects}`);
          return;
        }

        const cleanPath = event.urlAfterRedirects.split('?')[0].split('#')[0];

        this.seoService.updateSeo(seoKey, cleanPath);
      });
  }

  private getDeepestRoute(
    route: ActivatedRouteSnapshot
  ): ActivatedRouteSnapshot {
    let currentRoute = route;

    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }

    return currentRoute;
  }
}
