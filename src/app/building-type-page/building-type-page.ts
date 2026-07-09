// building-type-page.component.ts
import { Component, computed, effect, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

import { BUILDING_TYPE_PAGES } from './building-type-pages.data';

@Component({
  selector: 'app-building-type-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './building-type-page.html',
  styleUrl: './building-type-page.scss',
})
export class BuildingTypePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);

  readonly slug = toSignal(
    this.route.paramMap.pipe(
      map(params => params.get('slug') ?? '')
    ),
    { initialValue: '' }
  );

  readonly page = computed(() => {
    const slug = this.slug();

    return BUILDING_TYPE_PAGES.find(page => page.slug === slug) ?? null;
  });

  constructor() {
    effect(() => {
      const page = this.page();

      if (!page) {
        this.router.navigateByUrl('/404');
        return;
      }

      this.title.setTitle(page.metaTitle);

      this.meta.updateTag({
        name: 'description',
        content: page.metaDescription,
      });

      this.meta.updateTag({
        property: 'og:title',
        content: page.metaTitle,
      });

      this.meta.updateTag({
        property: 'og:description',
        content: page.metaDescription,
      });

      this.meta.updateTag({
        property: 'og:image',
        content: page.heroImage,
      });

      this.setCanonicalUrl(`https://heritagesteelbuilds.com/${page.slug}`);
    });
  }

  private setCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null =
      this.document.querySelector("link[rel='canonical']");

    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }
}